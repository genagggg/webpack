import React from 'react'
import CPost from '../CPosts/CPost'

const CPostList = ({posts}:any) => {
  return (
    <div>
      {posts.map((post: any)=><CPost name={post.name} password={post.password} remove={post.remove} key={post.id}/>)}
    </div>
  )
}

export default CPostList
