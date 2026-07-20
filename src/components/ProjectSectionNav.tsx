import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from 'react'
import type { SectionNavItem } from '../data/nokiaSections'
import './ProjectSectionNav.css'

type ProjectSectionNavProps = {
  sections: SectionNavItem[]
  scrollContainerRef: RefObject<HTMLElement | null>
  contentReady?: boolean
}

function scrollSectionIntoView(
  id: string,
  container: HTMLElement,
): HTMLElement | null {
  const target = document.getElementById(id)
  if (!target) return null

  const containerTop = container.getBoundingClientRect().top
  const targetTop = target.getBoundingClientRect().top

  container.scrollTo({
    top: container.scrollTop + targetTop - containerTop,
    behavior: 'smooth',
  })

  return target
}

export default function ProjectSectionNav({
  sections,
  scrollContainerRef,
  contentReady = true,
}: ProjectSectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')
  const isScrollingRef = useRef(false)

  useEffect(() => {
    if (!contentReady) return

    const container = scrollContainerRef.current
    if (!container) return

    let observer: IntersectionObserver | null = null

    const setupObserver = () => {
      const elements = sections
        .map((section) => document.getElementById(section.id))
        .filter((element): element is HTMLElement => element !== null)

      if (!elements.length) return

      observer?.disconnect()

      observer = new IntersectionObserver(
        (entries) => {
          if (isScrollingRef.current) return

          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

          if (visible[0]?.target.id) {
            setActiveId(visible[0].target.id)
          }
        },
        {
          root: container,
          rootMargin: '-10% 0px -60% 0px',
          threshold: [0, 0.1, 0.25, 0.5, 0.75],
        },
      )

      elements.forEach((element) => observer?.observe(element))
    }

    const frame = requestAnimationFrame(setupObserver)

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [sections, scrollContainerRef, contentReady])

  const handleClick = (id: string, event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const container = scrollContainerRef.current
    if (!container) return

    const target = scrollSectionIntoView(id, container)
    if (!target) return

    setActiveId(id)
    isScrollingRef.current = true

    window.setTimeout(() => {
      isScrollingRef.current = false
    }, 800)
  }

  return (
    <nav className="project-section-nav" aria-label="Case study sections">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          className={activeId === section.id ? 'is-active' : undefined}
          onClick={(event) => handleClick(section.id, event)}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}
