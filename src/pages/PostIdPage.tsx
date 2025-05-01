import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import PostService from "../API/PostServuce";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

const PostIdPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(Number(id));
    setPost(response); 
  });
  
  const [fetchComment, isComLoading, comError] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(Number(id));
    setComments(response.comments); 
  });

  useEffect(() => {
    if (id) {
      fetchPostById();
      fetchComment();
    }
  }, [id]);

  if (!id) return <div>Пост не найден</div>;

  return (
    <div>
      <h1>Вы попали на страницу поста c ID = {id}</h1>
      
      {isLoading ? (
        <Loader />
      ) : (
        post && (
          <div>
            <h2>{post.id}. {post.title}</h2>
            <p>{post.body}</p>
          </div>
        )
      )}
      
      <h2>Комментарии</h2>
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ marginBottom: '1rem' }}>
              <h5>{comm.user.username}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
