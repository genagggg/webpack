import React, { useRef, useState } from "react";
import CButton from "./CUI/cbutton/CButton";
import { SlCallEnd } from "react-icons/sl";
import CInput from "./CInput/CInput";
import CPost from "./CPosts/CPost";
import CPostList from "./CPostList/CPostList";
import CModal from "./CModal/CModal";

const CouchApp = () => {
  const [postArray, setPostArray] = useState([
    { id: "1", name: "John", password: "23144" },
    { id: "2", name: "Kolia", password: "186374" },
  ])
  console.log(postArray)
  const [changeValue, setChangeValue] = useState({ name: "", password: "" });
  const [valueTest, setValueTest] = useState({ id: "", name: "", password: "" });
  const centTestForm = (e: any) => {
    e.preventDefault();
    const newPost = {
      id: Date.now().toString(), // Перевёл в строку потомучто id строка.
      name: valueTest.name,
      password: valueTest.password,
    }
    setPostArray([...postArray, newPost])
    console.log("Значение поста:", postArray)
  };

  const remPost = ()=>{
    console.log('удалён')
  }

  const [trueModal, setTrueModal] = useState(true)
  return (
    <div>
      <CModal visible={trueModal} setVisible={setTrueModal}>Контент какойто</CModal>
      <CInput type={"submit"} />
      <input
        name="userName"
        type="text"
        value={changeValue.name}
        onChange={(e) => {
          setChangeValue({ ...changeValue, name: e.target.value });
        }}
      />
      <input
        name="password"
        type="text"
        value={changeValue.password}
        onChange={(e) => {
          setChangeValue({ ...changeValue, password: e.target.value });
        }}
      />
      <CButton>
        <SlCallEnd />
        Первая кнопка
      </CButton>
      <p>{changeValue.name}</p>
      <p>{changeValue.password}</p>

      <form>
        <CInput
          name="userName"
          onChange={(e: any) =>
            setValueTest({ ...valueTest, name: e.target.value })
          }
        />
        <CInput
          name="password"
          onChange={(e: any) =>
            setValueTest({ ...valueTest, password: e.target.value })
          }
        />
        <CInput onClick={centTestForm} type="submit" />
      </form>

      <CPostList posts={postArray}/>
    </div>
  );
};

export default CouchApp;
