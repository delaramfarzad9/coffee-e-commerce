import React from "react";
import Link from "next/link";

export default function PostItem({ title, href }) {
  return (
    <li className="list-none">
      <Link
        href={href}
        className="text-amber-800 dark:text-orange-200/80 hover:text-amber-700 dark:hover:text-orange-300 active:opacity-75 transition-all duration-200"
      >
        {title}
      </Link>
    </li>
  );
}
