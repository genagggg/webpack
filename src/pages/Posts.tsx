import React from "react";
import { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostServuce";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/UI/PostForm/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import NewPostList from "../components/Posts/NewPostList/NewPostList";
import Pagination from "../components/UI/pagination/Pagination";

export const Posts = () => {
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
    <div>
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
      <hr/>
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
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
        limit={limit}
      />
    </div>
  );
};
