import React from 'react'
import styles from './CButton.module.scss'
interface CUIButton{
children?: any
props?: any
onClick?: any
}
const CButton: React.FC<CUIButton> = ({children, ...props}: any) => {
  return (
    <button className={styles.cButtonStyles} {...props}>{children}</button>
  )
}

export default CButton
