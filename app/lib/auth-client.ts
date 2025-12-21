import { createAuthClient } from "better-auth/react";
import type { auth } from "@/lib/auth.server";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
    plugins: [inferAdditionalFields<typeof auth>()],
});
