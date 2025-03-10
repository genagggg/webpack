import React from "react";
import style from "./CModal.module.scss";
const CModal = ({ children, visible, setVisible }: any) => {
    const rootClasses = [style.Modal]
    if(visible){
rootClasses.push(style.active)
    }
  return (
    <div className={rootClasses.join(" ")} onClick={()=>setVisible(false)}>
      <div className={style.ModalContent} onClick={(e: any)=>{e.stopPropagation()}}>{children}</div>
    </div>
  );
};

export default CModal;
