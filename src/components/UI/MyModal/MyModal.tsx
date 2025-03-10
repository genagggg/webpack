import React from 'react'
import style from './MyModal.module.scss'

const MyModal = ({children, visible, setVisible}: any) => {
  const rootClasses = [style.myModal]
  if(visible){
rootClasses.push(style.active)
  }
  return (
    <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
      <div className={style.myModalContent} onClick={(e:any)=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default MyModal
