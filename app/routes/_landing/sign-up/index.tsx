import { BookOpenText } from "lucide-react";

import { Link, redirect } from "react-router";
import { SignUpForm } from "@/components/landing/sign-up-form";
import type { Route } from "../+types";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export async function clientAction({
  context,
  params,
  request,
}: Route.ClientActionArgs) {
  const formdata = await request.formData();
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const username = formdata.get("username") as string;
  console.log(formdata);
  const { data, error } = await authClient.signUp.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      name: username, // user display name
      callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    }
  );

  if (error){
    toast.error(error.message)
    return;
  }
  
  toast.success("Sign Up Complete!")
  return redirect('/dashboard');
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
        <SignUpForm />
      </div>
    </div>
  );
}
