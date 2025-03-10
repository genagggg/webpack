import React from "react";
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
export default function PostList({ posts, title }: any) {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post: any) => (
          
            <PostItem post={post} />
          
        ))}
      </TransitionGroup>
    </div>
  );
}
