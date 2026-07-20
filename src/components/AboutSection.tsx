import { forwardRef } from 'react'
import './AboutSection.css'

const EXPERIENCE = [
  {
    title: 'UX Designer',
    titleFont: 'bricolage' as const,
    lines: ['Nokia', '01 2024 - Now'],
  },
  {
    title: 'UX/UI and Graphic Designer Intern',
    titleFont: 'inter' as const,
    lines: ['BDigital', '02 2023 - 06 2023'],
  },
] as const

const EDUCATION = [
  {
    title:
      'Master in Design and Direction of User Experience (UX) and Digital Services',
    lines: ['ELISAVA - Barcelona, Spain', '2022 - 2023'],
  },
  {
    title: 'Bachelor in Communication Design',
    lines: ['Faculty of Fine-Arts of Lisbon - Portugal', '2018 - 2021'],
  },
  {
    title: 'Secondary studies in Visual Arts',
    lines: [
      'Escola secundária de Miraflores - Lisbon, Portugal',
      '2012 - 2018',
    ],
  },
] as const

export default forwardRef<HTMLElement>(function AboutSection(_props, ref) {
  return (
    <section ref={ref} className="about-section" aria-label="About me">
      <div className="about-section__hero" aria-hidden="true">
        <div className="about-section__hero-image-wrap">
          <img
            className="about-section__hero-image"
            src="/about/hero-wide.png"
            alt=""
            width={1374}
            height={412}
            loading="lazy"
            decoding="async"
          />
        </div>

        <img
          className="about-section__doodle about-section__doodle--star-left"
          src="/about/doodle-star-left.svg"
          alt=""
          width={130}
          height={99}
        />
        <img
          className="about-section__doodle about-section__doodle--smiley"
          src="/about/doodle-smiley.svg"
          alt=""
          width={91}
          height={61}
        />
        <img
          className="about-section__doodle about-section__doodle--star-right"
          src="/about/doodle-star-right.svg"
          alt=""
          width={82}
          height={106}
        />
      </div>

      <div className="about-section__intro">
        <div className="about-section__intro-copy">
          <p className="about-section__headline font-bricolage">
            My passion is transforming complex concepts into simple and joyful
            interactions through thoughtful and grounded design. I bring a
            flexible yet structured mindset, adapting to challenges while
            focusing on systemic problems and meaningful outcomes.
          </p>
        </div>
      </div>

      <div className="about-section__details">
        <div className="about-section__column about-section__column--experience">
          <p className="about-section__section-label font-bricolage">
            Experience
          </p>

          {EXPERIENCE.map((item) => (
            <article key={item.title} className="about-section__entry">
              <h3
                className={`about-section__entry-title${
                  item.titleFont === 'bricolage'
                    ? ' about-section__entry-title--bricolage font-bricolage'
                    : ''
                }`}
              >
                {item.title}
              </h3>
              <div className="about-section__entry-meta">
                {item.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="about-section__column about-section__column--education">
          <p className="about-section__section-label font-bricolage">
            Education
          </p>

          <div className="about-section__entries about-section__entries--education">
            {EDUCATION.map((item) => (
              <article key={item.title} className="about-section__entry">
                <h3 className="about-section__entry-title">{item.title}</h3>
                <div className="about-section__entry-meta">
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <footer className="about-section__footer">
        <p>This website was designed and vibecoded by me.</p>
      </footer>
    </section>
  )
})
