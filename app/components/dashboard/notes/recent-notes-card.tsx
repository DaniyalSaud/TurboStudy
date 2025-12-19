import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router";

interface IRecentNotesCard {
  id: string;
  title: string;
  subject: string;
  summary: string;
}

export default function RecentNotesCard(note: IRecentNotesCard) {
  return (
    <Link to={`/dashboard/notes/${note.id}`}>
      <Card
        key={note.id}
        className="px-1 py-2 sm:p-4 group gap-2 hover:shadow-lg transition-all duration-300 bg-white dark:bg-neutral-900 dark:hover:border-neutral-600 border"
      >
        <CardHeader className="gap-0 sm:gap-2 ">
          <CardTitle className="text-xs sm:text-sm font-semibold line-clamp-1 sm:line-clamp-1 text-gray-900 dark:text-gray-100">
            {note.title}
          </CardTitle>
          <CardDescription className="hidden text-xs line-clamp-1 font-medium text-gray-500 dark:text-gray-400">
            {note.subject}
          </CardDescription>
        </CardHeader>

        <CardContent className="hidden sm:block">
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
            {note.summary}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
