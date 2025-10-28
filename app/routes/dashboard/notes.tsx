import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Clock,
  Star,
  Eye,
  Edit,
  MoreVertical,
  BookOpen,
  Search,
  Filter,
  SortAsc,
  Download,
  Share2,
} from "lucide-react";
import { Link, redirect } from "react-router";
import { Input } from "@/components/ui/input";
import type { Route } from "./+types/notes";
import { Notes, type INotes } from "@/models/Notes";
import { auth } from "@/lib/auth.server";
import { sessionContext } from "@/lib/session-context";
import type { Query } from "mongoose";

export async function loader({ context, params, request }: Route.LoaderArgs) {
  const session = await auth.api.getSession(request);
  if (!session?.session) {
    throw redirect("/login");
  }

  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const notesPerPage = 10;
    const user = context.get(sessionContext)?.user;

    // Fetch notes from the database using userId
    if (!user?.id) {
      throw new Error("User not found in session");
    }

    // Build query to filter by userId
    let query: any = { userId: user.id };
    
    if (searchQuery) {
      // Use regex for more flexible search with userId filter
      query = {
        userId: user.id,
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { subject: { $regex: searchQuery, $options: "i" } },
          { summary: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    // Fetch the total notes count for this user
    const totalNotesCount = await Notes.countDocuments({ userId: user.id });
    const filteredCount = await Notes.countDocuments(query);
    const notes = await Notes.find(query)
      .select([
        "_id",
        "title",
        "subject",
        "summary",
        "tags",
        "updatedAt",
        "userId",
      ])
      .skip((page - 1) * notesPerPage)
      .limit(notesPerPage)
      .lean(); // Convert to plain JavaScript objects

    // Convert ObjectIds to strings for serialization
    const serializedNotes = notes.map((note) => ({
      ...note,
      _id: note._id.toString(),
      userId: note.userId.toString(),
    }));

    console.log("Fetched notes:", serializedNotes);
    return { notes: serializedNotes, count: filteredCount, total: totalNotesCount };
  } catch (error) {
    console.error("Error fetching notes:", error);
    return { notes: [], total: 0 };
  }
}

export default function NotesPage({ loaderData }: Route.ComponentProps) {
  const { notes, total } = loaderData;

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
          />
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <SortAsc className="h-4 w-4 mr-1" />
            Sort
          </Button>
        </div>
      </div>

      {/* Notes Grid - 3x3 Layout */}
      <div className="flex items-center justify-center">
        <div className="grid flex-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {notes.map((note) => (
            <Card
              key={note._id}
              className="group hover:shadow-md transition-all duration-300 bg-white dark:bg-neutral-900 hover:border-slate-300 dark:hover:border-slate-600"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 transition-colors">
                      {note.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {note.subject}
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="h-full flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {note.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {note.tags?.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/20 transition-colors cursor-default"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {(note.tags?.length || 0) > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{note.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {note?.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : 'N/A'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />4 pages
                      </span>
                    </div>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link to={`/dashboard/notes/${note._id}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full transition-colors"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // Handle download functionality
                      console.log(`Downloading note: ${note.title}`);
                    }}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // Handle share functionality
                      console.log(`Sharing note: ${note.title}`);
                    }}
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
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
    </div>
  );
}
