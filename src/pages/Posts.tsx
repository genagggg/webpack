import React, { useEffect, useState, useCallback, useRef } from "react";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/UI/PostForm/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import NewPostList from "../components/Posts/NewPostList/NewPostList";
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

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [limit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterOptions>({ sort: "", query: "" });
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useRef<HTMLDivElement>(null);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
    const response = await PostService.getAll(limit, skip);
    
    if (response.posts.length === 0) {
      setHasMore(false);
      return;
    }
    
    setPosts(prevPosts => [...prevPosts, ...response.posts]);
    setIsInitialLoading(false);
  });

  useEffect(() => {
    // Сбрасываем состояние при изменении фильтра
    setPosts([]);
    setSkip(0);
    setHasMore(true);
    setIsInitialLoading(true);
  }, [filter]);

  useEffect(() => {
    if (hasMore) {
      fetchPosts();
    }
  }, [skip, filter, hasMore]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !isPostsLoading) {
      setSkip(prevSkip => prevSkip + limit);
    }
  }, [hasMore, isPostsLoading, limit]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    });
    
    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }
    
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [handleObserver, sortedAndSearchedPosts]);

  const createPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setModal(false);
  };

  const removePost = (post: Post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
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

      {isInitialLoading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <Loader />
        </div>
      ) : (
        <>
          <NewPostList remove={removePost} posts={sortedAndSearchedPosts} />
          <div ref={lastPostElementRef} style={{ height: "20px" }} />
        </>
      )}
      
      {isPostsLoading && !isInitialLoading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Loader />
        </div>
      )}
      
      {!hasMore && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          Вы достигли конца списка
        </div>
      )}
    </div>
  );
};

export default Posts;