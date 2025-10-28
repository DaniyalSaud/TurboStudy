import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/landing/login-form";
import { Link, redirect } from "react-router";
import type { Route } from "../+types";
import { authClient } from "@/lib/auth-client";

export async function clientAction({
  context,
  params,
  request,
  serverAction,
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  console.log("Form Data:", Array.from(formData.entries()));
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await authClient.signIn.email({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in:", error);
    return { error };
  }
  console.log("User signed in:", data?.user);
  if (data?.user) {
    return redirect("/dashboard");
  }
}

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          TurboStudy
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
