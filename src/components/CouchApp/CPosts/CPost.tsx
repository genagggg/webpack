import React from 'react'
import CButton from '../CUI/cbutton/CButton'
import style from './CPost.module.scss'

const CPost = ({name, password, remove}:any) => {
  return (
    <div className={style.postContainer}>
      <div>{name}</div>
      <div>{password}</div>
      <CButton onClick={()=>remove()}>Удалить</CButton>
    </div>
  )
}

export default CPost
