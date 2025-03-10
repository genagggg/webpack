import React, { useRef, useState } from 'react'
import MyInput from '../input/MyInput'
import MyButton from '../button/MyButton'
import NewTestInput from '../../Inputs/NewTestInput/NewTestInput'

const FirstFormInput = () => {
const [value, setValue] = useState('')
const [body, setBody] = useState('')
const cendForm=(e: any)=>{
e.preventDefault()
}

const refInp:React.MutableRefObject<HTMLInputElement> = useRef()
  return (
    <form>
      <NewTestInput ref={refInp} value={value} onChange={(e:any)=>{setValue(e.target.value)}}/>
      <MyInput value={body} onChange={(e:any)=>{setBody(e.target.value)}}/>
      <MyButton onClick={cendForm}>Отправить форму</MyButton>
    </form>
  )
}

export default FirstFormInput
