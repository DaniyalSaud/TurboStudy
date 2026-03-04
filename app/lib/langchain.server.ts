import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";

const apiKey = process.env.GOOGLE_API_KEY || "";

export const geminiLLM = new ChatGoogleGenerativeAI({
  apiKey,
  model: "gemini-2.5-flash",
});

const chatPrompt = ChatPromptTemplate.fromTemplate(
  `You are an AI study assistant.
    You must answer only using the provided note context.
    If the answer is not present in the note context, respond exactly with:
    "I don't know. I cannot provide an answer based on the given note."

    Chat History: 
    {chat_history}
    
    Context: {context}
    Question: {question}

    Keep answers clear and concise, and do not use external knowledge.`
); 

export const chatLLMChain = chatPrompt.pipe(geminiLLM).pipe(
  new StringOutputParser()
);
