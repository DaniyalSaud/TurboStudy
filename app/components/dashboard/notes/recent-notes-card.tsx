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
        className="px-1 py-2 sm:p-4 group gap-2 hover:shadow-md hover:border-primary/30 transition-all duration-200 border"
      >
        <CardHeader className="gap-0 sm:gap-2">
          <CardTitle className="text-xs sm:text-sm font-semibold line-clamp-1">
            {note.title}
          </CardTitle>
          <CardDescription className="hidden text-xs line-clamp-1 font-medium">
            {note.subject}
          </CardDescription>
        </CardHeader>

        <CardContent className="hidden sm:block">
          <p className="text-xs text-muted-foreground line-clamp-1">
            {note.summary}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
