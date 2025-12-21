import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI as string;

console.log("MONGO_URI:", MONGO_URI);

const client = new MongoClient(MONGO_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  trustedOrigins: [
    "http://localhost:5173",
    "http://192.168.0.100:5173",
    "http://localhost:3000",
    "http://192.168.0.100:3000",
    process.env.BETTER_AUTH_URL as string,
  ],
});
