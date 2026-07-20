import { forwardRef } from 'react'
import './TitleReveal.css'

export type TitleSlotLayout =
  | 'hello-work'
  | 'hello-about'
  | 'work-about'
  | 'hello-from-empty'
  | 'about-from-empty'

type TitleRevealProps = {
  progress: number
  layout?: TitleSlotLayout
  hidden?: boolean
  instant?: boolean
}

const PLACEHOLDER = '\u00A0'

const SLOT_CONTENT = {
  'hello-work': {
    line1Top: 'Hello!',
    line1Bottom: 'Selected',
    line2Top: "I'm Inês.",
    line2Bottom: 'work',
    labels: ['Hello! I\'m Inês.', 'Selected work'] as const,
  },
  'hello-about': {
    line1Top: 'Hello!',
    line1Bottom: 'About',
    line2Top: "I'm Inês.",
    line2Bottom: 'myself',
    labels: ['Hello! I\'m Inês.', 'About myself'] as const,
  },
  'work-about': {
    line1Top: 'Selected',
    line1Bottom: 'About',
    line2Top: 'work',
    line2Bottom: 'myself',
    labels: ['Selected work', 'About myself'] as const,
  },
  'hello-from-empty': {
    line1Top: 'Hello!',
    line1Bottom: PLACEHOLDER,
    line2Top: "I'm Inês.",
    line2Bottom: PLACEHOLDER,
    labels: [undefined, 'Hello! I\'m Inês.'] as const,
  },
  'about-from-empty': {
    line1Top: PLACEHOLDER,
    line1Bottom: 'About',
    line2Top: PLACEHOLDER,
    line2Bottom: 'myself',
    labels: [undefined, 'About myself'] as const,
  },
} as const

const TitleReveal = forwardRef<HTMLDivElement, TitleRevealProps>(
  function TitleReveal(
    { progress, layout = 'hello-work', hidden = false, instant = false },
    ref,
  ) {
    const displayProgress = progress
    const copy = SLOT_CONTENT[layout]
    const isRiseFromEmpty =
      layout === 'hello-from-empty' || layout === 'about-from-empty'
    const isEmpty = hidden || displayProgress >= 2
    const label =
      displayProgress >= 2
        ? undefined
        : layout === 'hello-from-empty' && displayProgress < 0.5
          ? copy.labels[1]
          : layout === 'about-from-empty' && displayProgress >= 0.5
            ? copy.labels[1]
            : displayProgress < 0.5
              ? copy.labels[0]
              : copy.labels[1]

    return (
      <div
        ref={ref}
        className={`main-title${isEmpty ? ' main-title--hidden' : ''}${instant ? ' main-title--instant' : ''}`}
        aria-label={label || undefined}
        aria-hidden={isEmpty}
        style={{ '--title-progress': displayProgress } as React.CSSProperties}
      >
        <div className="title-slot title-slot--hello">
          <div className="title-slot__track">
            <p
              className={`title-slot__text font-bricolage${isRiseFromEmpty && copy.line1Top === PLACEHOLDER ? ' title-slot__text--placeholder' : ''}`}
            >
              {copy.line1Top}
            </p>
            <p
              className={`title-slot__text font-bricolage${isRiseFromEmpty && copy.line1Bottom === PLACEHOLDER ? ' title-slot__text--placeholder' : ''}`}
              aria-hidden={displayProgress < 0.5}
            >
              {copy.line1Bottom}
            </p>
          </div>
        </div>

        <div className="title-slot title-slot--ines">
          <div className="title-slot__track">
            <p
              className={`title-slot__text font-bricolage${isRiseFromEmpty && copy.line2Top === PLACEHOLDER ? ' title-slot__text--placeholder' : ''}`}
            >
              {copy.line2Top}
            </p>
            <p
              className={`title-slot__text font-bricolage${isRiseFromEmpty && copy.line2Bottom === PLACEHOLDER ? ' title-slot__text--placeholder' : ''}`}
              aria-hidden={displayProgress < 0.5}
            >
              {copy.line2Bottom}
            </p>
          </div>
        </div>
      </div>
    )
  },
)

export default TitleReveal
