import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link, redirect } from "react-router";
import RecentNotesCard from "@/components/dashboard/notes/recent-notes-card";
import AIInput from "@/components/dashboard/ai-input";
import type { Route } from "./+types/index";
import { getRecentNotes } from "@/lib/DAL/notes";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const data = await auth.api.getSession(request);
    if (!data || !data.session || !data.user) {
      throw redirect("/login");
    }
    const session = data.session;
    const recentNotes = await getRecentNotes(session.userId);

    return { recentNotes, userName: data.user.name ?? "" };
  } catch (err) {
    console.error("Error in loader:", err);
    return {};
  }
}

export default function MainPage({ loaderData }: Route.ComponentProps) {
  const { recentNotes = [], userName = "" } = loaderData;

  return (
    <div className="relative p-5 pb-28 flex flex-1 h-auto flex-col items-center overflow-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Welcome back,
            {userName && <span className="ml-2">{userName}!</span>}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Continue reviewing and chatting with your notes.
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
        {recentNotes.length === 0 && (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h2 className="text-lg font-semibold">No notes yet</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Your notes will appear here once they are created.
            </p>
            <Link to="/dashboard/notes" className="inline-block mt-4">
              <Button variant="outline" size="sm">
                Browse Notes
              </Button>
            </Link>
          </div>
        )}
      </div>

      <AIInput />
    </div>
  );
}
