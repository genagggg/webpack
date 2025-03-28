import React from 'react'
import styles from './CInput.module.scss'
const CInput = React.forwardRef((props: any, ref: any) => {
    console.log(props)
  return (
    <input className={styles.CInputStyle} {...props} ref={ref}/>
  )
})

export default CInput
