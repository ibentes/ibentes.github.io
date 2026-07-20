import './NokiaCover.css'

export default function NokiaCover() {
  return (
    <picture>
      <source
        media="(max-width: 900px)"
        srcSet="/work/nokia/cover-mobile.png"
      />
      <img
        src="/work/nokia/cover-1372.png"
        srcSet="/work/nokia/cover-1372.png 4096w"
        sizes="(min-width: 901px) 75vw, 100vw"
        width={1372}
        height={700}
        alt=""
        className="nokia-cover"
      />
    </picture>
  )
}
