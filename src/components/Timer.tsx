import { createPublicKey } from "crypto";
import { FC, useEffect, useState } from "react";
interface IUTimer{
  comand: string
}

export default function Timer({comand}:IUTimer): JSX.Element {
  const [count, setCount] = useState(null);
  const printNumber = (from: number, to: number) => {
    let current = from;
    let timerId = setInterval(function () {
      if (current == to) {
        clearInterval(timerId);
      }
      setCount(current);
      current++;
    }, 1000);
  };

  useEffect(() => {
    if(comand == "ok"){
    printNumber(5, 25);
    }
  },[comand]);
  return <div>Hello Timer: {count}
  <h1>{comand}</h1>
  </div>;
}
