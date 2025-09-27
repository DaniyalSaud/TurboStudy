import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(
    process.env.MONGODB_URL as string,
);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    appName: "turbo-study-backend",
    plugins: [],
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    }
});
