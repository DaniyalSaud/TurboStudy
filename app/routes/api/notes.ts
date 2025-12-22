import type { Route } from "./+types/notes";
import { Notes } from "@/models/Notes";
import { auth } from "@/lib/auth.server";

export async function action({ request }: Route.ActionArgs) {
  try {
    const body = await request.json();

    const {
      noteId,
      content,
      title,
    }: { noteId: string; content: string; title: string } = body;

    if (!noteId) {
      throw new Error("No note ID found.");
    }

    const data = await auth.api.getSession();
    if (!data || !data.user || !data.session) {
      throw new Error("User not authenticated.");
    }
    const note = await Notes.findOne({ _id: noteId });
    const user = data.user;
    // Note not found
    if (!note) {
      throw new Error("Note not found.");
    }

    // Wrong user trying to edit the note
    if (note.userId.toString() != user?.id) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized to edit the note.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Update the note
    const updatedNote = await Notes.findOneAndUpdate(
      { _id: noteId, userId: user?.id },
      {
        content,
        title,
      },
      { new: true }
    );

    // Serialize the updated note to ensure it's JSON-safe
    const serializedNote = updatedNote
      ? {
          _id: updatedNote._id.toString(),
          title: updatedNote.title,
          content: updatedNote.content,
          userId: updatedNote.userId.toString(),
          createdAt: updatedNote.createdAt?.toISOString(),
          updatedAt: updatedNote.updatedAt?.toISOString(),
          recentlyViewed: updatedNote.recentlyViewed?.toISOString(),
        }
      : null;

    // Regenerate the summary after the changes.

    return new Response(
      JSON.stringify({
        updatedNote: serializedNote,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error trying to update the note.", (err as Error).message);
    return new Response(
      JSON.stringify({
        message: "Error trying to update the note",
        error: (err as Error).message,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
