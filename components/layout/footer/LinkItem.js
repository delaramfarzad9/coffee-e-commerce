// components/LinkItem.jsx
import React from 'react'
import Link from 'next/link'

export default function LinkItem({ href, children, external = false, className = '' }) {
  return (
    <Link
      href={href}
      className={`font-semibold text-yellow-600 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </Link>
  )
}
