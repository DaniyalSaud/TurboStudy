import { Chat } from "@/models/Chat";
import { Message } from "@/models/Message";
import { redirect } from "react-router";

export async function getChat(noteId: string, userId: string){
    try{

        let chat = await Chat.findOne({
            noteId
        })

        if (!chat){
            const newChat = new Chat({
               userId,
               noteId,
               total_messages: 0,
               systemPrompt: "Empty" 
            })

            await newChat.save();

            chat = newChat;
        }

        if (chat.userId.toString() !== userId){
            throw new Error("Unauthorized to fetch the chat!")
        }


    }catch(err){
        console.error("Error getting chat for the note: ", noteId);
        console.error("Error:", (err as Error).message);

        throw redirect("/dashboard/notes");
    }
}


async function getMessages(chatId: string){
    try{
        const messages = await Message.find().sort()
    }catch(err){
        console.error("Error fetching messages!")
        console.error("Error: ", (err ))
    }
}

