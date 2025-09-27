import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/_landing/layout.tsx", [
    index("./routes/_landing/index.tsx"),
    route("pricing", "./routes/_landing/pricing/index.tsx"),
    route("about", "./routes/_landing/about/index.tsx"),
    route("login", "./routes/_landing/login/index.tsx"),
    route("sign-up", "./routes/_landing/sign-up/index.tsx"),
  ]),
  ...prefix("dashboard", [
    layout("./routes/dashboard/layout.tsx", [
      index("routes/dashboard/index.tsx"),
      route("upload", "./routes/dashboard/upload.tsx"),
      route("notes", "./routes/dashboard/notes.tsx"),
      route("history", "./routes/dashboard/history.tsx"),
      route("chat", "./routes/dashboard/chat.tsx"),
      route('chat/:id', './routes/dashboard/chat/chat.$id.tsx'),
      route("notes/:id", "./routes/dashboard/notes/notes.$id.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
