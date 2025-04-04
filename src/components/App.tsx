import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import style from "./App.module.scss";
import NewPost from "./Posts/NewPost/NewPost";
import NewPostList from "./Posts/NewPostList/NewPostList";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import PostForm from "./UI/PostForm/PostForm";
import MySelect from "./UI/select/MySelect";
import PostFilter from "./PostFilter";
import CouchApp from "./CouchApp/CouchApp";
import MyModal from "./UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostServuce";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  async function fetchPosts() {
    setIsPostsLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts);
    setIsPostsLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = (newPost: any) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post: any) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className={style.App}>
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton
        style={{ marginTop: "30px" }}
        onClick={() => {
          setModal(true);
        }}
      >
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr className={style.hrcustom} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostsLoading ? (
        <h1>Идёт загрузка...</h1>
      ) : (
        <NewPostList remove={removePost} posts={sortedAndSearchedPosts} />
      )}

      <div className={style.boxRed}></div>
      <hr />
      <p>Ниже Находится Тестовая Область приложения</p>

      {/* <CouchApp></CouchApp>   //Тренировочный компонент app  */}
    </div>
  );
}
