import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CircleAlert,
  Clock,
  Download,
  Eye,
  FileText,
  Loader2,
  MoreVertical,
  RefreshCcw,
  Share2,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useFetcher, useRevalidator } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

interface INotesCard {
  _id: string;
  title: string;
  subject: string;
  summary: string;
  tags: string[];
  status: "processing" | "failed" | "generated";
  updatedAt: NativeDate;
}

export default function NotesCard(note: INotesCard) {
  const fetcher = useFetcher();
  const revalidator = useRevalidator();

  const handleDelete = () => {
    fetcher.submit(
      { action: "delete", noteId: note._id },
      {
        method: "POST",
        encType: "application/json",
      }
    );
  };

  const handleDownload = async () => {
    console.log("Downloaded!");
  };

  const handleShare = async () => {
    console.log("Shared!");
  };

  // Polling every 5 seconds to check for status update
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (note.status === "processing") {
      interval = setInterval(() => {
        revalidator.revalidate();
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [note.status, revalidator]);

  return (
    <Card
      key={note._id}
      className={`group gap-2 sm:gap-4 hover:shadow-md transition-all duration-200 h-54 sm:h-58 md:h-66 ${note.status !== "failed" ? "hover:border-primary/30" : "border-destructive/60 hover:border-destructive/40"} ${note.status === "failed" ? "gap-0!" : ""}`}
    >
      {note.status === "generated" && (
        <>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-2">
                <CardTitle className="text-sm sm:text-base font-semibold line-clamp-1">
                  {note.title}
                </CardTitle>
                <CardDescription className="text-[0.7rem] sm:text-xs font-medium">
                  {note.subject}
                </CardDescription>
              </div>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                >
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={handleDelete}
                  >
                    <Trash2 />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleShare}
                  >
                    <Share2 />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleDownload}
                  >
                    <Download />
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="h-full flex flex-col justify-between">
            <div>
              <p className="text-[0.7rem] sm:text-xs text-muted-foreground mb-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {note.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap h-6 overflow-hidden gap-1 mb-2">
                {note.tags.slice(0, 3).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-[0.65rem] sm:text-xs cursor-default"
                  >
                    {tag}
                  </Badge>
                ))}
                {(note.tags.length || 0) > 3 && (
                  <Badge variant="outline" className="text-[0.6rem] sm:text-xs">
                    +{note.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 sm:mb-4">
                <div className="flex items-center gap-3">
                  <span className="flex text-xs items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {note.updatedAt
                      ? new Date(note.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link to={`/dashboard/notes/${note._id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="w-full h-7 sm:h-8 transition-colors"
                >
                  <Eye className="h-2 w-2 sm:h-3 sm:w-3" />
                  View
                </Button>
              </Link>
            </div>
          </CardContent>
        </>
      )}
      {note.status === "processing" && (
        <CardContent className="h-full flex flex-col justify-center items-center">
          <Loader2 className="h-20 w-20 text-muted-foreground/50 animate-spin" />
          <p className="cursor-default select-none animate-pulse text-base font-medium text-muted-foreground mt-6">
            Your notes are being generated...
          </p>
        </CardContent>
      )}
      {note.status === "failed" && (
        <>
          <CardHeader>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="ml-auto" asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
              >
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={handleDelete}
                >
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="h-full flex flex-col justify-center ">
            <div className="flex flex-col justify-evenly items-center flex-1 ">
              <CircleAlert className="h-20 w-20 text-destructive" />
              <p className="cursor-default select-none text-center text-sm font-medium text-destructive mt-6">
                Failed to generate notes. Please try again.
              </p>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
