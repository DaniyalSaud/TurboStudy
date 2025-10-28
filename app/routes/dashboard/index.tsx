import React, { useState } from "react";
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
  Upload,
  FileText,
  MessageCircle,
  Clock,
  Plus,
  Brain,
  Eye,
  Edit,
  MoreVertical,
} from "lucide-react";
import { Link, redirect, type LoaderFunctionArgs } from "react-router";
import clsx from "clsx";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for recent notes
const recentNotes = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    subject: "Computer Science",
    lastModified: "2 hours ago",
    pageCount: 15,
    summary:
      "Comprehensive overview of ML algorithms, supervised and unsupervised learning techniques.",
    tags: ["Machine Learning", "AI", "Algorithms"],
  },
  {
    id: 2,
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    lastModified: "1 day ago",
    pageCount: 8,
    summary:
      "Key organic reactions including nucleophilic substitution and elimination mechanisms.",
    tags: ["Organic Chemistry", "Reactions", "Mechanisms"],
  },
  {
    id: 3,
    title: "World War II History",
    subject: "History",
    lastModified: "3 days ago",
    pageCount: 22,
    summary:
      "Timeline and key events of WWII, including major battles and political changes.",
    tags: ["History", "WWII", "Politics"],
  },
];

export default function MainPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome back,
          {!data && (
            <Skeleton className="inline-block bg-neutral-800 h-4 w-24 ml-2" />
          )}
          {data?.user?.name && <span className="ml-2">{data.user.name}!</span>}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ready to turn your study materials into smart notes?
        </p>
      </div>

      {/* Recent Notes Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Recent Notes
          </h2>
          <Link to="/dashboard/notes">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View All Notes
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNotes.map((note) => (
            <Card
              key={note.id}
              className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-neutral-900"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {note.title}
                    </CardTitle>
                    <CardDescription className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {note.subject}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-1">
                  {note.summary}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {note.lastModified}
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <FileText className="h-3 w-3" />
                      {note.pageCount} pages
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/dashboard/notes/${note.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link to={`/dashboard/chat/${note.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create New Notes Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Create New Notes
        </h2>
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
          <CardContent>
            <div
              className={`text-center ${isDragOver ? "bg-blue-50 dark:bg-blue-900/20" : ""} rounded-lg transition-colors`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div
                  className={clsx(
                    "p-3 rounded-full transition-colors duration-500",
                    uploadedFile
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-blue-100 dark:bg-blue-900/30"
                  )}
                >
                  {!uploadedFile && (
                    <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-opacity duration-1000" />
                  )}
                  {uploadedFile && (
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400 transition-opacity duration-1000" />
                  )}
                </div>

                {uploadedFile ? (
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      File Selected: {uploadedFile.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <div>
                      <Button
                        variant="outline"
                        className="mr-4 text-red-500 dark:text-red-400"
                        onClick={() => setUploadedFile(null)}
                      >
                        <Edit className="h-4 w-4 text-red-500 dark:text-red-400" />
                        Remove File
                      </Button>

                      <Button onClick={handleCreateNotes} className="mt-4">
                        <Brain className="h-4 w-4" />
                        Generate Smart Notes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Upload your PDF document
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Drag and drop your PDF file here, or click to browse
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Maximum file size: 20MB
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="outline" className="relative">
                        <Plus className="h-4 w-4" />
                        Choose File
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </Button>
                      <Link to="/dashboard/upload">
                        <Button>
                          <Upload className="h-4 w-4" />
                          Go to Upload Page
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
