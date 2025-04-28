import React from "react";
import style from "./NewPost.module.scss";
import MyButton from "../../UI/button/MyButton";
import { useNavigate } from "react-router-dom";
interface UINewPost {
  number: any;
  remove: any;
  post: any;
}
const NewPost = ({ number, remove, post }: UINewPost) => {
  const navigate = useNavigate()
  console.log(navigate)
  return (
    <div className={style.postConteiner}>
      <h1>
        {number}, {post.title}
      </h1>
      <p>{post.description}</p>
      <div className={style.post__btns}>
        <MyButton onClick={() => navigate(`/posts/${post.id}`)}>Открыть</MyButton>
        <MyButton onClick={() => remove(post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default NewPost;
