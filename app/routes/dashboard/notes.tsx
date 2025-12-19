import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Search, Filter } from "lucide-react";
import { Link, redirect, useSearchParams} from "react-router";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Route } from "./+types/notes";
import { auth } from "@/lib/auth.server";
import { sessionContext } from "@/lib/session-context";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getNotes } from "@/lib/DAL/notes";
import NotesCard from "@/components/dashboard/notes/notes-card";
import { Notes } from "@/models/Notes";

export async function action({ context, params, request }: Route.ActionArgs) {
  try {
    const body = await request.json();
    const user = context.get(sessionContext)?.user;
    if (!user){
      throw new Response("Unauthorized", { status: 401 });
    }
    if (body.action === "delete") {
      const deletedNote = await Notes.deleteOne({
        _id: body.noteId,
        userId: user.id,
      });

      if (!deletedNote.acknowledged) {
        throw new Error("Note not found or could not be deleted");
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in notes action:", err);
    throw new Response(JSON.stringify({ success: false, error: (err as Error).message }), {
      status: 404,
    });
  }
}

export async function loader({ context, params, request }: Route.LoaderArgs) {
  const session = await auth.api.getSession(request);
  if (!session?.session) {
    throw redirect("/login");
  }

  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const sortBy = url.searchParams.get("sortBy") || "recent";
    const notesPerPage = 10;

    const user = context.get(sessionContext)?.user;

    // Fetch notes from the database using userId
    if (!user?.id) {
      throw new Error("User not found in session");
    }

    const { notes, filteredCount, totalNotesCount } = await getNotes(
      user.id,
      searchQuery,
      page,
      notesPerPage,
      sortBy
    );

    const serializedNotes = notes.map((note) => ({
      ...note,
      _id: note._id.toString(),
      userId: note.userId.toString(),
    }));

    return {
      notes: serializedNotes,
      count: filteredCount,
      total: totalNotesCount,
      currentPage: page,
      notesPerPage: notesPerPage,
      totalPages: Math.ceil(filteredCount / notesPerPage),
    };
  } catch (error) {
    console.error("Error fetching notes:", error);
    return {
      notes: [],
      total: 0,
      count: 0,
      currentPage: 1,
      notesPerPage: 10,
      totalPages: 0,
    };
  }
}

export default function NotesPage({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { notes, total, count, currentPage, notesPerPage, totalPages } =
    loaderData;
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") || "recent"
  );

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams);
      params.set("search", search.trim());
      params.set("page", "1");
      if (sortBy) params.set("sortBy", sortBy);
      setSearchParams(params);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", value);
    params.set("page", "1");
    if (search) params.set("search", search);
    setSearchParams(params);
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              All Notes
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage and organize your study materials
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Search Input with Icon */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-gray-300" />
          <Input
            placeholder="Search notes by title or subject..."
            className="pl-10 pr-4 py-2 w-full bg-neutral-50 dark:bg-neutral-900"
            value={search}
            onChange={handleSearchTextChange}
            onKeyDownCapture={handleSearch}
          />
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={sortBy === "recent"}
                onClick={() => handleSortChange("recent")}
              >
                Recently Created
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "desc"}
                onClick={() => handleSortChange("desc")}
              >
                Date (Newest First)
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "asc"}
                onClick={() => handleSortChange("asc")}
              >
                Date (Oldest First)
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notes Grid - 3x3 Layout */}
      <div className="flex items-center justify-center">
        <div className="grid flex-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {notes.map((note, index) => (
            <NotesCard
              key={index}
              _id={note._id}
              title={note.title}
              subject={note.subject}
              summary={note.summary}
              tags={note.tags}
              updatedAt={note.updatedAt}
              status={note.status}
            />
          ))}
        </div>
      </div>

      {/* Empty State (when no notes) - Hidden when notes exist */}
      {notes.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No notes yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start by uploading your first study material
          </p>
          <Link to="/dashboard">
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Upload Notes
            </Button>
          </Link>
        </div>
      )}

      {/* Pagination - Only show if there are notes */}
      {notes.length > 0 && totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {/* Page Numbers */}
            {pageNumbers.map((pageNum, index) => (
              <PaginationItem key={index}>
                {pageNum === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={`?page=${pageNum}`}
                    isActive={pageNum === currentPage}
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages ? `?page=${currentPage + 1}` : "#"
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Notes count info */}
      {notes.length > 0 && (
        <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {(currentPage - 1) * notesPerPage + 1} to{" "}
          {Math.min(currentPage * notesPerPage, count)} of {count} notes
        </div>
      )}
    </div>
  );
}
