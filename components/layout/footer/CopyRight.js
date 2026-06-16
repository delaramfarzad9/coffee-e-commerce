import React from "react";

export default function CopyRight() {
  return (
    <div className="py-3 text-center border-t border-amber-200/60 dark:border-orange-200/15">
      <p className="text-xs font-spartan text-amber-900 dark:text-orange-200/70">
        © 2025{" "}
        <a
          href="/"
          className="self-center underline hover:text-sky-500 dark:hover:text-orange-300 transition"
        >
          SetCoffee
        </a>
        . All rights reserved.
      </p>
    </div>
  );
}
