import { connectToMongoDB } from "@/db/config";
import { Notes, type INotes } from "@/models/Notes";

export const getNotes = async (
  userId: string,
  searchQuery: string,
  page: number,
  notesPerPage: number,
  sortBy: string = "recent"
) => {
  await connectToMongoDB();
  try {
    // Build query to filterby userId
    let query: any = { userId };

    if (searchQuery) {
      // Use regex for more flexible search with userId filter
      query = {
        userId,
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { subject: { $regex: searchQuery, $options: "i" } },
          { summary: { $regex: searchQuery, $options: "i" } },
        ],
        // Limit tags to only 3
        tags: { $slice: 3 },
      };
    }

    // Fetch the total notes count for this user
    const totalNotesCount = await Notes.countDocuments({ userId });
    const filteredCount = await Notes.countDocuments(query);

    // Determine sort order based on sortBy parameter
    let sortOrder: any = {};
    switch (sortBy) {
      case "recent":
        sortOrder = { createdAt: -1 }; // Recently created (newest first by creation date)
        break;
      case "desc":
        sortOrder = { updatedAt: -1 }; // Date descending (newest updates first)
        break;
      case "asc":
        sortOrder = { updatedAt: 1 }; // Date ascending (oldest updates first)
        break;
      default:
        sortOrder = { createdAt: -1 };
    }

    const notes = await Notes.find(query)
      .select([
        "_id",
        "title",
        "subject",
        "summary",
        "tags",
        "updatedAt",
        "userId",
        "status",
      ])
      .sort(sortOrder)
      .skip((page - 1) * notesPerPage)
      .limit(notesPerPage)
      .lean();

    return {
      notes,
      totalNotesCount,
      filteredCount,
    };
  } catch (err) {
    console.error("Error fetching notes:", err);
    return {
      notes: [],
      totalNotesCount: 0,
      filteredCount: 0,
    };
  }
};

export const getNotebyId = async (id: string, userId: string) => {
  try {
    await connectToMongoDB();
    const note = await Notes.findOne({ _id: id, userId });

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    return null;
  }
};

export const getRecentNotes = async (userId: string, limit: number = 5) => {
  try {
    // Connect to MongoDB
    await connectToMongoDB();

    // Fetch recent notes for the user
    const recentNotes = await Notes.find({ userId, status: "generated" })
      .sort({ updatedAt: -1 }) // Sort by most recently updated
      .limit(limit) // Limit the number of notes returned
      .select(["_id", "title", "subject", "summary", "status"])
      .lean();

    recentNotes.forEach((note) => {
      note.id = note._id.toString();
    });

    return recentNotes;
  } catch (error) {
    console.error("Error fetching recent notes:", error);
    return [];
  }
};
