import { ReactNode } from "react";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const privateRoutes: RouteConfig[] = [
  { path: "/about", element: <About /> },
  { path: "/posts", element: <Posts /> },
  { path: "/posts/:id", element: <PostIdPage /> },
];

export const publicRouters: RouteConfig[] = [
  { path: "/login", element: <Login /> },
]
