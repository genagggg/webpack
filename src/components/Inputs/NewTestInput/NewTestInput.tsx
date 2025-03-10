import React from 'react'
import styles from './NewTestInput.module.scss'
const NewTestInput = React.forwardRef((props: any, ref) => {
  return (
    <input className={styles.newInput} ref={ref} {...props}/>
  )
})

export default NewTestInput
