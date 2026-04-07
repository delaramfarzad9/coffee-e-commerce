import React from 'react';
import Link from 'next/link';

export default function PostItem({ title, href }) {
  return (
    <li  className="list-none">
      <Link 
        href={href} 
        className="text-amber-800 hover:text-amber-700 transition-colors duration-200  "
      >
        {title}
      </Link>
    </li>
  );
}
