import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";

const apiKey = process.env.GOOGLE_API_KEY || "";

export const geminiLLM = new ChatGoogleGenerativeAI({
  apiKey,
  model: "gemini-2.5-flash",
});

const chatPrompt = ChatPromptTemplate.fromTemplate(
  `You are an AI assistant that helps users by answering their questions based on the provided context.
    Chat History: 
    {chat_history}
    
    Context: {context}
    Question: {question}

    Provide a detailed and accurate answer based on the context. If the context does not contain the answer, respond with "I don't know. I cannot provide an answer based on the given information."`
); 

export const chatLLMChain = chatPrompt.pipe(geminiLLM).pipe(
  new StringOutputParser()
);
