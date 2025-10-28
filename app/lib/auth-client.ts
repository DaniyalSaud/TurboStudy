import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth.server";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_BASE_URL as string,
    plugins: [inferAdditionalFields<typeof auth>()],
});
