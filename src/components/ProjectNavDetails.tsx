import type { Project } from '../data/projects'
import './ProjectNavDetails.css'

type ProjectNavDetailsProps = {
  project: Project | null
}

export default function ProjectNavDetails({ project }: ProjectNavDetailsProps) {
  if (!project) return null

  return (
    <div className="project-nav-details" aria-live="polite">
      <p>{project.projectLabel}</p>
      <p>{project.role}</p>
      <p>{project.date}</p>
    </div>
  )
}
