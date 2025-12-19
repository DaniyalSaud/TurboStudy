import type { INotes } from "@/models/Notes";
import { PDFParse } from "pdf-parse";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const promptTemplate =
  ChatPromptTemplate.fromTemplate(`Generate study notes based on the following prompt and styles. If any text from the provided PDF is relevant, incorporate that as well. The content should be well-structured in a markdown format.

Prompt: {prompt}
Styles: {styles}
PDF Text: {fileText}

Please respond with ONLY valid JSON in the following format. Do NOT include markdown code fences or any other text:

{{
    "title": "string value",
    "subject": "string value",
    "content": "markdown formatted content - ensure all special characters are properly escaped",
    "summary": "string value",
    "tags": ["tag1", "tag2", "tag3"]
}}

IMPORTANT: 
- Return ONLY the JSON object
- Ensure all quotes, newlines, and special characters in string values are properly escaped
- Do NOT use trailing commas
- Ensure the content is informative and engaging.`);

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY as string,
  model: "gemini-2.5-flash",
});

const outputParser = new StringOutputParser();

// Helper function to strip markdown code fences from JSON response
function stripCodeFences(response: string): string {
  // Remove ``` json and ``` wrappers if present
  let cleaned = response.replace(/^```\s*json\s*\n?|\n?```$/gi, "").trim();
  
  // Fix common JSON formatting issues:
  // Remove trailing commas before closing braces/brackets
  cleaned = cleaned.replace(/,(\s*[}\]])/g, "$1");
  
  // Try to parse and re-stringify to ensure valid JSON
  try {
    const parsed = JSON.parse(cleaned);
    return JSON.stringify(parsed);
  } catch (e) {
    // If parsing fails, return the cleaned version and let the caller handle it
    console.warn("JSON cleanup: Initial parse failed, returning cleaned string");
    return cleaned;
  }
}

export async function generateNotes(
  prompt: string,
  styles: string[],
  pdf: File | null,
  noteEntry: INotes
) {
  try {
    let fileText: string = "";
    if (pdf !== null && pdf.size > 0) {
      const parser = new PDFParse({
        data: await pdf.arrayBuffer(),
      });

      fileText = (await parser.getText()).text;
    }

    const aiResponse = await getAIResponse(prompt, styles, fileText);
    console.log(aiResponse);
    const cleanedResponse = stripCodeFences(aiResponse);
    const parsedResponse = JSON.parse(cleanedResponse);

    // Update noteEntry with AI response
    await noteEntry.updateOne({
      title: parsedResponse.title,
      subject: parsedResponse.subject,
      content: parsedResponse.content,
      summary: parsedResponse.summary,
      tags: parsedResponse.tags,
      status: "generated",
    });

    return;
  } catch (err) {
    console.error("Error in generateNotes: ", err);
    await noteEntry.updateOne({
      status: "failed",
    });

    return;
  }
}

async function getAIResponse(
  prompt: string,
  styles: string[],
  fileText: string
) {
  try {
    const chain = promptTemplate.pipe(llm).pipe(outputParser);
    const response = await chain.invoke({
      prompt,
      styles: styles.join(", "),
      fileText,
    });

    return response;
  } catch (err) {
    console.error("Error in Chain: ", err);
    throw err;
  }
}
