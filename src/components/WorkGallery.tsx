import { forwardRef } from 'react'
import { projects, type Project } from '../data/projects'
import './WorkGallery.css'

type WorkGalleryProps = {
  activeProjectId?: string | null
  onProjectHover?: (project: Project | null) => void
  onProjectSelect?: (project: Project) => void
}

const SELECTABLE_PROJECT_IDS = new Set(['nokia', 'wise', 'wellness'])

const WorkGallery = forwardRef<HTMLDivElement, WorkGalleryProps>(
  function WorkGallery({ activeProjectId, onProjectHover, onProjectSelect }, ref) {
    const isEnteringProject = activeProjectId !== null && activeProjectId !== undefined

    return (
      <div
        ref={ref}
        className={`work-gallery${isEnteringProject ? ' work-gallery--entering-project' : ''}`}
        aria-label="Selected work"
      >
        <div className="work-gallery__inner">
          {projects.map((project, index) => {
            const isSelectable =
              Boolean(onProjectSelect) && SELECTABLE_PROJECT_IDS.has(project.id)

            return (
            <figure
              key={project.id}
              data-project-id={project.id}
              className={`work-thumb work-thumb--responsive${isSelectable ? ' work-thumb--clickable' : ''}${activeProjectId === project.id ? ' work-thumb--selected' : ''}${isEnteringProject && activeProjectId !== project.id ? ' work-thumb--suppressed' : ''}`}
              style={
                {
                  '--thumb-aspect': project.aspectRatio,
                  '--thumb-aspect-mobile': project.mobileAspectRatio,
                } as React.CSSProperties
              }
              onMouseEnter={() => onProjectHover?.(project)}
              onMouseLeave={() => onProjectHover?.(null)}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                if (!isSelectable) return
                onProjectSelect?.(project)
              }}
              onKeyDown={(event) => {
                if (
                  isSelectable &&
                  (event.key === 'Enter' || event.key === ' ')
                ) {
                  event.preventDefault()
                  onProjectSelect?.(project)
                }
              }}
              role={isSelectable ? 'button' : undefined}
              tabIndex={isSelectable ? 0 : undefined}
            >
              <picture>
                <source
                  media="(max-width: 900px)"
                  srcSet={project.mobileSrc}
                  width={project.mobileWidth}
                  height={project.mobileHeight}
                />
                <img
                  src={project.src}
                  alt={project.alt}
                  className="work-thumb__image"
                  width={project.width}
                  height={project.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </picture>
            </figure>
            )
          })}
        </div>
      </div>
    )
  },
)

export default WorkGallery
