import React from 'react'
import NewPost from '../NewPost/NewPost'
import { TransitionGroup, CSSTransition } from "react-transition-group";
const NewPostList = ({posts, remove}:any) => {
   if(!posts.length){
    return (
      <h1>Посты не найдены</h1>
    )
   }
  return (
    <div>
      <TransitionGroup>
      {posts.map((post: any, index: number)=>
      <CSSTransition key={post.id} timeout={500} classNames="post">
      <NewPost remove={remove} number={index+1} post={post}/>
      </CSSTransition>
      )}
      </TransitionGroup>
    </div>
  )
}

export default NewPostList
