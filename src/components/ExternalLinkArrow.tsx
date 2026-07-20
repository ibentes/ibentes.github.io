import externalArrowIcon from '../assets/external-arrow.svg'

type ExternalLinkArrowProps = {
  className?: string
}

export default function ExternalLinkArrow({
  className = '',
}: ExternalLinkArrowProps) {
  return (
    <img
      src={externalArrowIcon}
      alt=""
      className={`external-link-arrow${className ? ` ${className}` : ''}`}
      width={12}
      height={12}
      aria-hidden
    />
  )
}
