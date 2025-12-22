import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Link, redirect } from "react-router";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import RecentNotesCard from "@/components/dashboard/notes/recent-notes-card";
import AIInput from "@/components/dashboard/ai-input";
import type { Route } from "./+types/index";
import { getRecentNotes } from "@/lib/DAL/notes";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth.server";

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const data = await auth.api.getSession();
    if (!data || !data.session || !data.user) {
      throw redirect("/login");
    }
    const session = data.session;
    const recentNotes = await getRecentNotes(session.userId);

    return { recentNotes };
  } catch (err) {
    console.error("Error in loader:", err);
    return {};
  }
}

export default function MainPage({ loaderData }: Route.ComponentProps) {
  const { recentNotes = [] } = loaderData;
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [noteStyle, setNoteStyle] = useState<string>("detailed");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf" && file.size <= 20 * 1024 * 1024) {
        setUploadedFile(file);
      } else {
        alert("Please upload a PDF file under 20MB");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf" && file.size <= 20 * 1024 * 1024) {
        setUploadedFile(file);
      } else {
        alert("Please upload a PDF file under 20MB");
      }
    }
  };

  const handleCreateNotes = async () => {
    if (uploadedFile) {
      // Make a POST request to the server to process the uploaded file
      const formData = new FormData();
      formData.append("docs", uploadedFile);
      formData.append("metadata", JSON.stringify({ uploadedBy: "Danial" }));
      const response = await fetch("/api/v1/ai/notes", {
        method: "POST",
        body: formData,
      });
      console.log(await response.json());
    }
  };

  const { data } = authClient.useSession();

  if (!data || !data.user) {
    return null; // Or a loading state
  }

  return (
    <div className="relative p-5 flex flex-1 h-auto flex-col items-center overflow-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Welcome back,
            {!data && (
              <Skeleton className="inline-block bg-neutral-800 h-4 w-24 ml-2" />
            )}
            {data.user.name && <span className="ml-2">{data.user.name}!</span>}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Ready to turn your study materials into smart notes?
          </p>
        </div>

        {/* Recent Notes Section */}
        {recentNotes.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                Recent Notes
              </h2>
              <Link to="/dashboard/notes">
                <Button
                  variant="outline"
                  className="h-6 text-xs sm:text-sm sm:h-8"
                >
                  <Eye className="h-2 w-2 sm:h-4 sm:w-4 mr-0 sm:mr-1" />
                  View All Notes
                </Button>
              </Link>
            </div>

            <div className="grid grid-rows-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 [&>*:nth-child(n+3)]:hidden sm:[&>*:nth-child(n+3)]:block sm:[&>*:nth-child(n+4)]:hidden md:[&>*:nth-child(n+4)]:block md:[&>*:nth-child(n+5)]:hidden xl:[&>*:nth-child(n+5)]:block">
              {recentNotes.map((note, index) => (
                <RecentNotesCard
                  key={index}
                  id={note.id}
                  title={note.title}
                  subject={note.subject}
                  summary={note.summary}
                />
              ))}
            </div>
          </div>
        )}

        {recentNotes.length > 0 && <Separator className="my-6" />}
        <div className="mb-4 text-center">
          <h2 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Create Smart Notes with AI
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
            Upload your study materials and let our AI generate concise,
            detailed notes for you.
          </p>
        </div>
      </div>

      {/* Input Group */}
      <AIInput />
    </div>
  );
}
