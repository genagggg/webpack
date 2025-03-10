import React from "react";
import style from "./NewPost.module.scss";
import MyButton from "../../UI/button/MyButton";
interface UINewPost {
  number: any;
  remove: any;
  post: any;
}
const NewPost = ({ number, remove, post }: UINewPost) => {
  return (
    <div className={style.postConteiner}>
      <h1>
        {number}, {post.title}
      </h1>
      <p>{post.description}</p>
      <MyButton onClick={() => remove(post)}>Удалить</MyButton>
    </div>
  );
};

export default NewPost;
