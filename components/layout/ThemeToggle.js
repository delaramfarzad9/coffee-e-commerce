import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Svg from "../ui/Svg";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="p-2">
      <Svg
        svgId={theme === "dark" ? "sun" : "moon"}
        className={`cursor-pointer transition-transform duration-500 md:w-6 md:h-6 
          ${theme === "dark" ? "rotate-180 text-yellow-200" : "text-gray-500"}`}
      />
    </button>
  );
}
   