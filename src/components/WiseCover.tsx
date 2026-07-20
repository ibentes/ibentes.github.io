import './WiseCover.css'

export default function WiseCover() {
  return (
    <div className="wise-cover" aria-hidden>
      <img
        src="/work/wise/cover-mobile.png"
        alt=""
        className="wise-cover__mobile"
        width={1400}
        height={1400}
      />
      <div className="wise-cover__desktop">
        <img
          src="/work/wise/cover-phone-3.png"
          alt=""
          className="wise-cover__phone wise-cover__phone--back"
          width={752}
          height={564}
        />
        <img
          src="/work/wise/cover-phone-1.png"
          alt=""
          className="wise-cover__phone wise-cover__phone--left"
          width={760}
          height={570}
        />
        <img
          src="/work/wise/cover-phone-2.png"
          alt=""
          className="wise-cover__phone wise-cover__phone--center"
          width={800}
          height={600}
        />
      </div>
    </div>
  )
}
