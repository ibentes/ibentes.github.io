import './DesignProcessTimeline.css'

export default function DesignProcessTimeline() {
  return (
    <div className="nokia-timeline" aria-hidden>
      <img
        className="nokia-timeline__image"
        src="/work/nokia/design-process-timeline.png"
        srcSet="/work/nokia/design-process-timeline.png 1024w, /work/nokia/design-process-timeline@2x.png 4096w"
        sizes="(min-width: 901px) 75vw, 100vw"
        width={1024}
        height={203}
        alt=""
      />
    </div>
  )
}
