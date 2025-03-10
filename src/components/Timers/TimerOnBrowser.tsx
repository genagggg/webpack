import { FC, useEffect, useState } from "react";
interface UITimerf{
  command: string
}
export const TimerOnBrowser = ({command}:UITimerf) => {
  const [count, setCount] = useState(null);
  const [tap, setTap] = useState(0)
  const [text, setText] = useState('byx Rf')
  const incrementFunction =()=>{
    setTap(tap+1)
  }
  const decrementFunction=()=>{
    setTap(tap-1)
  }
  const printNumber = (from: number, to: number) => {
    let current = from;
    const timerId = setInterval(() => {
      if (current == to) {
        clearInterval(timerId);
      }
      setCount(current);
      current++;
    }, 1000);
  };

  useEffect(() => {
    printNumber(10, 30);
  }, []);

  return (
    <div>{command}
      <h2>Таймер Браузера:{count}</h2>
      <h1>Счётчик: {tap}</h1>
      <h2></h2>
      <input type="text" value={text} onChange={event=>setText(event.target.value)}/>
      <button style={{color: "green"}} onClick={incrementFunction}>Increace</button>
      <button style={{color: 'red'}} onClick={decrementFunction}>Decreace</button>
    </div>
  );
};
