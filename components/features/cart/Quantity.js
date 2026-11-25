import Svg from "../../ui/Svg";

const btnClass =
  "flex justify-center items-center w-10 h-10 rounded-full cursor-pointer hover:text-orange-400 dark:hover:text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70";

export default function Quantity({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  className,
  label = "item",
}) {
  return (
    <div
      role="group"
      aria-label={`Quantity of ${label}`}
      className={`flex flex-row gap-0 border border-chocolate dark:border-orange-200/40 w-max m-auto rounded-full text-chocolate dark:text-orange-200 ${className}`}
    >
      {quantity === 1 ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label} from cart`}
          className={btnClass}
        >
          <Svg svgId="trash" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onDecrease}
          aria-label={`Decrease quantity of ${label}`}
          className={btnClass}
        >
          <Svg svgId="minus" />
        </button>
      )}

      <div
        aria-live="polite"
        className="flex justify-center items-center w-10 h-10"
      >
        {quantity}
      </div>

      <button
        type="button"
        onClick={onIncrease}
        aria-label={`Increase quantity of ${label}`}
        className={btnClass}
      >
        <Svg svgId="add" />
      </button>
    </div>
  );
}
