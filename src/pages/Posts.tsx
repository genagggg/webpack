import React, { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/UI/PostForm/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import NewPostList from "../components/Posts/NewPostList/NewPostList";
import Pagination from "../components/UI/pagination/Pagination";
import PostService from "../API/PostServuce";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

interface FilterOptions {
  sort: string;
  query: string;
}

interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [skip, setSkip] = useState<number>(0);
  const [filter, setFilter] = useState<FilterOptions>({ sort: "", query: "" });
  
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
    const response = await PostService.getAll(limit, skip);
    setPosts(response.posts);
    const totalCount = response.total;
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, [skip]); 

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post: Post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page: number, limit: number) => {
    setSkip((page - 1) * limit);
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: "30px" }}
        onClick={() => setModal(true)}
      >
        Создать пользователя
      </MyButton>
      
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      
      <hr />
      
      <PostFilter filter={filter} setFilter={setFilter} />

      {postsError && <h1>Произошла ошибка {postsError}</h1>}

      {isPostsLoading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
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

export default Posts;