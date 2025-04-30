import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostServuce";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState({ id: "", title: "" });
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComment, isComLoading, comError] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data.comments);
  });

  useEffect(() => {
    fetchPostById();
    fetchComment();
  }, []);
  return (
    <div>
      <h1>Вы попали на страницу поста c ID = ${id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Коментарии</h1>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div>
              <h5>{comm.id}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
