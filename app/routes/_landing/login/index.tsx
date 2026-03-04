import { BookOpenText } from "lucide-react";

import { LoginForm } from "@/components/landing/login-form";
import { Link, redirect } from "react-router";
import type { Route } from "../+types";
import { auth } from "@/lib/auth.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return Response.json(
      { error: "Please enter both email and password." },
      { status: 400 },
    );
  }

  try {
    const authResponse = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: request.headers,
      asResponse: true,
    });

    if (authResponse.status >= 400) {
      const responseBody = await authResponse.json().catch(() => null);
      const errorMessage =
        responseBody?.message ||
        responseBody?.error?.message ||
        "Invalid email or password.";

      return Response.json(
        { error: errorMessage },
        { status: authResponse.status },
      );
    }

    const responseHeaders = new Headers();
    const setCookies = (
      authResponse.headers as Headers & { getSetCookie?: () => string[] }
    ).getSetCookie?.();

    if (setCookies?.length) {
      for (const cookie of setCookies) {
        responseHeaders.append("set-cookie", cookie);
      }
    } else {
      const setCookie = authResponse.headers.get("set-cookie");
      if (setCookie) {
        responseHeaders.append("set-cookie", setCookie);
      }
    }

    return redirect("/dashboard", { headers: responseHeaders });
  } catch (error) {
    console.error("Login failed:", error);
    return Response.json(
      { error: "Unable to sign in right now. Please try again." },
      { status: 500 },
    );
  }
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-6">
        <Link
          to="/"
          className="mx-auto flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
            <BookOpenText className="size-4 text-primary" />
          </div>
          Back to home
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
