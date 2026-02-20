import React from 'react'
import logonama from '../../assets/Images/logonama.png'
import logonamad from '../../assets/Images/logonamad.png'
import logosign from '../../assets/Images/logosign.png'

export default function Certificate({ variant = 'iso', href = '#', label }) {
  const srcMap = { iso: logonama, fair: logonamad, org: logosign }
  const img = srcMap[variant]

  return (
    <figure className="flex flex-col items-center">
      <a
        href={href}
        aria-label={label || 'Certificate details'}
        className="inline-block p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <img src={img} alt={label || 'Certificate'} className="block w-28 h-auto" loading="lazy" />
      </a>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}
