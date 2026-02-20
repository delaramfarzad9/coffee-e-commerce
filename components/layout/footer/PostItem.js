import React from 'react';

export default function PostItem({ title, url }) {
  return (
    <li  className="list-none">
      <a 
        href={url} 
        className="text-amber-800 hover:text-amber-700 transition-colors duration-200  "
      >
        {title}
      </a>
    </li>
  );
}
