import type { EntryContext } from "react-router";
import { ServerRouter, RouterContextProvider } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

// Define the context type
export interface AppLoadContext {
  sessionData?: any;
  [key: string]: any;
}

// Export the getLoadContext function that returns a RouterContextProvider
export function getLoadContext() {
  return new RouterContextProvider();
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext
) {
  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
