import type { Session, User } from "better-auth";
import { createContext } from "react-router";

type SessionContext = {
  session: Session;
  user: User;
};


export const sessionContext = createContext<SessionContext | null>(null);