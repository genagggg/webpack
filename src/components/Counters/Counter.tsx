import React, { useState } from "react";
import "../App.scss"
export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <h1>Счётчик: {count}</h1>
      <button className="buttonStandart" onClick={increment}>Increment</button>
      <button className="button" onClick={decrement}>Decrement</button>
    </div>
  );
}
