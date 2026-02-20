import Svg from "../../ui/Svg";
import { useState } from "react";

export default function Quantity({ className, onRemove }) {
  const [count, setCount] = useState(1);
  const minusHandler = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const plusHandler = () => {
    setCount(count + 1);
  };
  const removeHandler = () => {
    setCount(0);
    if (onRemove) {
      onRemove(); // Notify parent component
    }
  };
  // Hide component if count is 0
  if (count === 0) {
    return null;
  }
  return (
    <div
      className={` flex flex-row gap-0 border border-chocolate w-max m-auto rounded-full text-chocolate ${className}`}
    >
      <div className="flex justify-center items-center w-10 h-10 hover:text-orange-400 ">
        {count === 1 ? (
          <Svg
            onClick={removeHandler}
            svgId="trash"
            className="cursor-pointer"
          />
        ) : (
          <Svg
            onClick={minusHandler}
            svgId="minus"
            className="cursor-pointer"
          />
        )}
      </div>
      <div className="flex justify-center items-center w-10 h-10  ">
        {count}
      </div>
      <div className="flex justify-center items-center w-10 h-10 hover:text-orange-400   ">
        <Svg onClick={plusHandler} svgId="add" className="cursor-pointer" />
      </div>
    </div>
  );
}
