import { ReactNode } from "react";
import About from "../../pages/About";
import Posts from "../../pages/Posts";
import PostIdPage from "../../pages/PostIdPage";
import Error from "../../pages/Error";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const routes: RouteConfig[] = [
  { path: "/", element: <About /> },
  { path: "/about", element: <About /> },
  { path: "/posts", element: <Posts /> },
  { path: "/posts/:id", element: <PostIdPage /> },
  { path: "*", element: <Error /> },
];
