import React, { useState } from 'react'
import MyInput from '../input/MyInput'
import MyButton from '../button/MyButton'

const PostForm = ({create}: any) => {
    const [post, setPost] = useState({ title: "", body: "" });

    const addNewPost = (e: any) => {
      e.preventDefault();
      const newPost = {...post, id: Date.now()}
      create(newPost)
      setPost({ title: "", body: "" });
    };

  return (
       <form action="">
    <MyInput
      value={post.title}
      onChange={(event: any) =>
        setPost({ ...post, title: event.target.value })
      }
    />
    <MyInput
      value={post.body}
      onChange={(event: any) =>
        setPost({ ...post, body: event.target.value })
      }
    />
    <MyButton onClick={addNewPost}>Cend</MyButton>
  </form>
  )
}

export default PostForm
