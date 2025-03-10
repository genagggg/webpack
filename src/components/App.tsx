import { SetStateAction, useMemo, useRef, useState } from "react";
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

export default function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "hhhhh" },
    { id: 2, title: "zz", body: "mmmm" },
    { id: 3, title: "bb", body: "aaa" },
  ]);

  const [modal, setModal] = useState(false)
const [filter, setFilter]=useState({sort:'', query:''})

  const sortedPosts = useMemo(() => {
    console.log("Отработала функция сортед постс");
    if (filter.sort) {
      return [...posts].sort((a: any, b: any) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(()=>{
    return sortedPosts.filter((post: any)=> 
      post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  const createPost = (newPost: any) => {
    setPosts([...posts, newPost]);
    setModal(false)
  };

  const removePost = (post: any) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className={style.App}>
      <MyButton style={{marginTop: '30px'}} onClick={()=>{setModal(true)}}>Создать пользователя</MyButton>
      {/* <MyModal visible={modal} setVisible={setModal}><PostForm create={createPost} /></MyModal> */}
      
      <PostFilter filter={filter} setFilter={setFilter}/>
      <hr className={style.hrcustom} />
      <NewPostList remove={removePost} posts={sortedAndSearchedPosts} />
      

      <div className={style.boxRed}></div>
      <hr />
      <p>Ниже Находится Тестовая Область приложения</p>

<CouchApp></CouchApp>

    </div>
  );
}
