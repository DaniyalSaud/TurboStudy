import { redirect, type MiddlewareFunction } from "react-router";
import { auth } from "@/lib/auth.server";
import { sessionContext } from "@/lib/session-context";
import type { Route } from "../+types/root";

export async function apiMiddleware(
  { context, request }: Route.LoaderArgs,
  next: MiddlewareFunction<Response>
) {
  const data = await auth.api.getSession(request);
  if (!data?.session) {
    throw new Response("Unauthorized to make the request", { status: 401 });
  }
  context.set(sessionContext, data);
}
