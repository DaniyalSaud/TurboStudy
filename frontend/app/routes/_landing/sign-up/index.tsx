import { GalleryVerticalEnd } from "lucide-react";

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
        <SignUpForm />
      </div>
    </div>
  );
}
