import { handleRequest } from '@vercel/react-router/entry.server';
import type { AppLoadContext, EntryContext } from 'react-router';
import { RouterContextProvider } from 'react-router';

// Export the getLoadContext function that returns a RouterContextProvider
export function getLoadContext() {
  return new RouterContextProvider();
}

export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext?: AppLoadContext,
): Promise<Response> {

    console.log("Handling request in entry.server.tsx");
    console.log("Request URL:", request.url);
    console.log("Response Status Code:", responseStatusCode);
    console.log("Response Headers:", responseHeaders);
    console.log("Router Context:", routerContext);
    console.log("Load Context:", _loadContext);

  return await handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    routerContext,
    _loadContext,
  );
}