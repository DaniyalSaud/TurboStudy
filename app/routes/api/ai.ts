import { redirect } from "react-router";
import type { Route } from "./+types/ai";
import { Notes } from "@/models/Notes";
import { generateNotes } from "@/background_jobs/generate.server";
import { auth } from "@/lib/auth.server";

export async function loader({}: Route.LoaderArgs) {
  // Does nothing
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const data = await auth.api.getSession();
    if (!data || !data.user || !data.session) {
      throw redirect("/login");
    }

    const user = data.user;
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const prompt = formData.get("prompt") as string;
    const styles = formData.getAll("styles") as string[];

    const noteEntry = new Notes({
      userId: user.id,
      title: "Generating",
      subject: "N/A",
      content: "Generating notes...",
      summary: "N/A",
      tags: [],
    });

    await noteEntry.save();

    // Background job to generate notes
    generateNotes(prompt, styles, file, noteEntry);

    return redirect("/dashboard/notes");
  } catch (err) {
    console.error("Error generating notes: ", err);
    throw new Response(
      JSON.stringify({
        error: "Failed to process AI action (generate notes).",
        details: (err as Error).message,
      }),
      { status: 400 }
    );
  }
}
