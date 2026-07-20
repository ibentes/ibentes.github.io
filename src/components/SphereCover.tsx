import './SphereCover.css'

export default function SphereCover() {
  return (
    <picture>
      <source
        media="(max-width: 900px)"
        srcSet="/work/sphere/cover-mobile.png"
      />
      <img
        src="/work/sphere/cover.png"
        width={1372}
        height={700}
        alt=""
        className="sphere-cover"
      />
    </picture>
  )
}
