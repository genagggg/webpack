import React from "react"
import classes from"./MyInput.module.scss"
const MyInput=React.forwardRef((props:any, ref)=> {
  return (
    <input ref={ref} className={classes.myInp} {...props}/>
  )
})

export default MyInput
