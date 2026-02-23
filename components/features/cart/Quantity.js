import Svg from "../../ui/Svg";

export default function Quantity({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  className
}) {
  return (
    <div
      className={`flex flex-row gap-0 border border-chocolate w-max m-auto rounded-full text-chocolate ${className}`}
    >
      <div className="flex justify-center items-center w-10 h-10 hover:text-orange-400">
        {quantity === 1 ? (
          <Svg
            onClick={onRemove}
            svgId="trash"
            className="cursor-pointer"
          />
        ) : (
          <Svg
            onClick={onDecrease}
            svgId="minus"
            className="cursor-pointer"
          />
        )}
      </div>

      <div className="flex justify-center items-center w-10 h-10">
        {quantity}
      </div>

      <div className="flex justify-center items-center w-10 h-10 hover:text-orange-400">
        <Svg
          onClick={onIncrease}
          svgId="add"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
