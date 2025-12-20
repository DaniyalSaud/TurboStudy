import { redirect, type MiddlewareFunction } from "react-router";
import type { Route } from "../routes/dashboard/+types";
import { auth } from "@/lib/auth.server";
import { sessionContext } from "@/lib/session-context";

export async function authMiddleware(
  { context, request }: Route.LoaderArgs,
  next: Route.MiddlewareFunction
) {
  const data = await auth.api.getSession(request);

  if (!data) {
    throw redirect("/login");
  }
  

  context.set(sessionContext, data);
}
