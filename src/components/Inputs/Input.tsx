import React, { useState } from "react";
interface InputProps {
  propsValue: string;
}

export default function Input({ propsValue }: InputProps) {
  const [customValue, setCustomValue] = useState(propsValue);
  return (
    <div>
      <h1>Текст Инпута: {propsValue}</h1>
      <input
        type="text"
        value={customValue}
        onChange={(event) => setCustomValue(event.target.value)}
      />
    </div>
  );
}
