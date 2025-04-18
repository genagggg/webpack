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
import Loader from "./UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [skip, setScip] = useState(0); // Вместо page
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
    const responce = await PostService.getAll(limit, skip);
    setPosts(responce.data.posts);
    const totalCount = responce.data.total;
    setTotalPages(getPageCount(totalCount, limit));
  });

  let pagesArray = getPagesArray(totalPages);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost: any) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post: any) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page: number, limit: number) => {
    setScip((page - 1) * limit);
    setPage(page);
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

      {postsError && <h1>Произошла ошибка ${postsError}</h1>}

      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <NewPostList remove={removePost} posts={sortedAndSearchedPosts} />
      )}

      <div className={style.page__wrapper}>
        {pagesArray.map((item) => {
          return (
            <span
              onClick={() => changePage(item, limit)}
              key={item}
              className={`${style.page} ${
                page === item ? style.page__current : ""
              }`}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
