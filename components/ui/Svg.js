
export default function Svg({ svgId, className = '', onClick }) {
  return (
    <svg className={`w-5 h-5 ${className}`} onClick={onClick}>
      <use href={`/icons/svgSprite.svg#${svgId}`} />
    </svg>
  )
}
