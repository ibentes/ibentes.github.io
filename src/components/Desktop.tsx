import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import arrowIcon from '../assets/arrow.svg'
import ExternalLinkArrow from './ExternalLinkArrow'
import type { Project } from '../data/projects'
import { useTitleRevealTrigger } from '../hooks/useTitleRevealTrigger'
import NokiaCaseStudy from './NokiaCaseStudy'
import SphereCaseStudy from './SphereCaseStudy'
import WiseCaseStudy from './WiseCaseStudy'
import ProjectNavDetails from './ProjectNavDetails'
import TitleReveal, { type TitleSlotLayout } from './TitleReveal'
import AboutSection from './AboutSection'
import WorkGallery from './WorkGallery'
import './Desktop.css'

const CASE_STUDY_PROJECT_IDS = new Set(['nokia', 'wise', 'wellness'])
const TITLE_TRANSITION_MS = 900

export default function Desktop() {
  const desktopRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutPanelRef = useRef<HTMLDivElement>(null)
  const projectPanelRef = useRef<HTMLDivElement>(null)
  const aboutTransitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const projectExitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const projectExitDestinationRef = useRef<'gallery' | 'about' | 'home'>('gallery')
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isGalleryNavFading, setIsGalleryNavFading] = useState(false)
  const [titleLayout, setTitleLayout] = useState<TitleSlotLayout>('hello-work')
  const [titleProgress, setTitleProgress] = useState(0)
  const [titleHidden, setTitleHidden] = useState(false)
  const [titleInstant, setTitleInstant] = useState(false)
  const [aboutEntered, setAboutEntered] = useState(false)
  const [isAboutEntering, setIsAboutEntering] = useState(false)
  const [isAboutExiting, setIsAboutExiting] = useState(false)
  const [galleryAboutExitEntered, setGalleryAboutExitEntered] = useState(false)
  const [projectEntered, setProjectEntered] = useState(false)
  const [isProjectExiting, setIsProjectExiting] = useState(false)
  const [galleryExitEntered, setGalleryExitEntered] = useState(false)
  const [helloExitEntered, setHelloExitEntered] = useState(false)
  const isProjectOpen = activeProjectId !== null
  const { progress, goHome } = useTitleRevealTrigger(galleryRef, {
    blocked: isProjectOpen || isAboutOpen,
    mainContentRef,
    blockedScrollRef: isAboutOpen
      ? aboutPanelRef
      : isProjectOpen
        ? projectPanelRef
        : mainContentRef,
  })
  const isRevealed = progress === 1
  const isContentRevealed = isRevealed || isAboutOpen
  const isAboutTransitioning = isAboutEntering || isAboutExiting
  const isAboutGalleryHidden =
    isAboutOpen || isAboutEntering || isAboutExiting
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)

  const clearAboutTransitionTimer = () => {
    if (aboutTransitionTimerRef.current) {
      clearTimeout(aboutTransitionTimerRef.current)
      aboutTransitionTimerRef.current = null
    }
  }

  const clearProjectExitTimer = () => {
    if (projectExitTimerRef.current) {
      clearTimeout(projectExitTimerRef.current)
      projectExitTimerRef.current = null
    }
  }

  const syncContentFadeEnter = (onEnter: () => void) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => onEnter())
    })
  }

  const animateTitleProgress = (
    nextProgress: number,
    setter: (value: number) => void = setTitleProgress,
  ) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setter(nextProgress))
    })
  }

  const resetAboutTransitionState = () => {
    setIsAboutEntering(false)
    setIsAboutExiting(false)
    setGalleryAboutExitEntered(false)
    setAboutEntered(false)
  }

  useEffect(() => () => {
    clearAboutTransitionTimer()
    clearProjectExitTimer()
  }, [])

  const finishAboutExit = () => {
    clearAboutTransitionTimer()
    resetAboutTransitionState()
    setIsAboutOpen(false)
    setTitleLayout('hello-work')
    setTitleProgress(0)
    goHome()
  }

  const isTitleScrollManaged =
    titleLayout === 'hello-work' &&
    !titleHidden &&
    !isProjectOpen &&
    !isAboutOpen &&
    !isAboutTransitioning &&
    !isProjectExiting &&
    !isGalleryNavFading

  const resolvedTitleProgress = isTitleScrollManaged ? progress : titleProgress

  const handleProjectSelect = (project: Project) => {
    if (
      !isRevealed ||
      isProjectExiting ||
      !CASE_STUDY_PROJECT_IDS.has(project.id)
    ) {
      return
    }

    setHoveredProject(null)
    setProjectEntered(false)
    setTitleLayout('hello-work')
    setTitleProgress(1)
    setTitleHidden(false)
    setActiveProjectId(project.id)

    syncContentFadeEnter(() => {
      animateTitleProgress(2)
    })

    window.setTimeout(() => {
      setTitleHidden(true)
    }, TITLE_TRANSITION_MS)
  }

  useLayoutEffect(() => {
    if (!activeProjectId) {
      setProjectEntered(false)
      return
    }

    const panel = projectPanelRef.current
    if (panel) {
      void panel.offsetHeight
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProjectEntered(true)
      })
    })
  }, [activeProjectId])

  useLayoutEffect(() => {
    if (!activeProjectId) return
    projectPanelRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeProjectId])

  const finishProjectExit = () => {
    clearProjectExitTimer()
    const destination = projectExitDestinationRef.current
    setIsProjectExiting(false)
    setGalleryExitEntered(false)
    setHelloExitEntered(false)
    setActiveProjectId(null)
    setTitleHidden(false)
    projectPanelRef.current?.scrollTo({ top: 0, behavior: 'instant' })

    if (destination === 'home') {
      setTitleLayout('hello-work')
      setTitleProgress(0)
      setIsGalleryNavFading(false)
      setTitleInstant(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTitleInstant(false))
      })
    }
  }

  const startProjectExit = (
    destination: 'gallery' | 'about' | 'home',
    onComplete?: () => void,
  ) => {
    if (!activeProjectId || isProjectExiting) return false

    clearProjectExitTimer()
    projectExitDestinationRef.current = destination
    setHoveredProject(null)
    setGalleryExitEntered(false)
    setHelloExitEntered(false)
    setIsProjectExiting(true)
    setProjectEntered(false)

    projectExitTimerRef.current = window.setTimeout(() => {
      projectExitTimerRef.current = null
      finishProjectExit()
      onComplete?.()
    }, TITLE_TRANSITION_MS)

    return true
  }

  useLayoutEffect(() => {
    if (!isProjectExiting) {
      setGalleryExitEntered(false)
      setHelloExitEntered(false)
      return
    }

    const gallery = galleryRef.current
    if (gallery) {
      void gallery.offsetHeight
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const destination = projectExitDestinationRef.current

        if (destination === 'gallery') {
          setTitleHidden(false)
          setTitleLayout('hello-work')
          setTitleProgress(1)
          setGalleryExitEntered(true)
          return
        }

        if (destination === 'home') {
          setIsGalleryNavFading(true)
          setTitleHidden(false)
          setTitleLayout('hello-from-empty')
          setTitleInstant(true)
          setTitleProgress(2)

          syncContentFadeEnter(() => {
            setHelloExitEntered(true)
            goHome()
            setTitleInstant(false)
            animateTitleProgress(0)
          })
        }
      })
    })
  }, [isProjectExiting, goHome])

  const handleCloseAboutToHome = () => {
    if (isAboutTransitioning) return

    clearAboutTransitionTimer()
    goHome()
    setIsGalleryNavFading(false)
    setTitleLayout('hello-about')
    setTitleInstant(true)
    setHoveredProject(null)
    setIsAboutExiting(true)
    setAboutEntered(false)
    setTitleProgress(1)
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'instant' })

    const panel = aboutPanelRef.current
    const title = titleRef.current
    if (panel) {
      void panel.offsetHeight
    }
    if (title) {
      void title.offsetHeight
    }

    syncContentFadeEnter(() => {
      setGalleryAboutExitEntered(true)
      setTitleInstant(false)
      animateTitleProgress(0)
    })

    aboutTransitionTimerRef.current = window.setTimeout(() => {
      aboutTransitionTimerRef.current = null
      finishAboutExit()
    }, TITLE_TRANSITION_MS)
  }

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    clearAboutTransitionTimer()
    setTitleInstant(false)
    setHoveredProject(null)
    mainContentRef.current?.scrollTo({ top: 0 })

    if (isProjectOpen) {
      startProjectExit('home')
      return
    }

    if (isAboutOpen) {
      handleCloseAboutToHome()
      return
    }

    if (isAboutTransitioning) return

    if (isRevealed) {
      setIsGalleryNavFading(true)
      setTitleLayout('hello-work')
      setTitleProgress(1)

      const gallery = galleryRef.current
      if (gallery) {
        void gallery.offsetHeight
      }

      syncContentFadeEnter(() => {
        goHome()
        animateTitleProgress(0)
      })

      aboutTransitionTimerRef.current = window.setTimeout(() => {
        aboutTransitionTimerRef.current = null
        setIsGalleryNavFading(false)
      }, TITLE_TRANSITION_MS)
      return
    }

    goHome()
  }

  const openAbout = () => {
    if (isAboutTransitioning) return

    clearAboutTransitionTimer()

    const fromProject = isProjectOpen
    const fromGallery = isRevealed

    setHoveredProject(null)
    setIsAboutEntering(true)
    setAboutEntered(false)
    setGalleryAboutExitEntered(false)
    setIsAboutExiting(false)
    setIsAboutOpen(true)
    setTitleHidden(false)
    setTitleInstant(true)
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'instant' })

    if (fromProject) {
      setTitleLayout('about-from-empty')
      setTitleProgress(2)
    } else if (fromGallery) {
      setTitleLayout('work-about')
      setTitleProgress(0)
    } else {
      setTitleLayout('hello-about')
      setTitleProgress(0)
    }

    if (fromGallery || fromProject) {
      goHome()
      setIsGalleryNavFading(false)
    }

    const panel = aboutPanelRef.current
    const title = titleRef.current
    if (panel) {
      void panel.offsetHeight
    }
    if (title) {
      void title.offsetHeight
    }

    if (fromProject) {
      startProjectExit('about')
    }

    syncContentFadeEnter(() => {
      setIsAboutEntering(false)
      setTitleInstant(false)
      setAboutEntered(true)
      animateTitleProgress(1)
    })
  }

  const handleAboutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (isAboutTransitioning) return

    if (isAboutOpen) {
      aboutSectionRef.current?.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    openAbout()
  }

  useEffect(() => {
    if (!isRevealed) {
      if (isAboutTransitioning || isProjectExiting) {
        return
      }

      clearProjectExitTimer()
      setIsProjectExiting(false)
      setGalleryExitEntered(false)
      setHoveredProject(null)
      setActiveProjectId(null)
      setTitleHidden(false)
      return
    }

    if (isAboutTransitioning) return

    if (isAboutOpen) {
      setIsAboutOpen(false)
      resetAboutTransitionState()
    }

    setTitleLayout('hello-work')
    setTitleInstant(false)
    setTitleHidden(false)
    setIsGalleryNavFading(false)
  }, [isRevealed, isAboutTransitioning, isAboutOpen, isProjectExiting])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')

    const syncScrollLock = () => {
      document.documentElement.classList.toggle(
        'gallery-revealed',
        mq.matches && isContentRevealed,
      )
    }

    syncScrollLock()
    mq.addEventListener('change', syncScrollLock)

    return () => {
      mq.removeEventListener('change', syncScrollLock)
      document.documentElement.classList.remove('gallery-revealed')
    }
  }, [isContentRevealed])

  useLayoutEffect(() => {
    const desktop = desktopRef.current
    const nav = navRef.current
    const title = titleRef.current
    if (!desktop || !nav || !title) return

    const updateChromeMetrics = () => {
      const navHeight = nav.getBoundingClientRect().height
      const titleHeight = title.getBoundingClientRect().height

      desktop.style.setProperty('--mobile-nav-height', `${navHeight}px`)
      desktop.style.setProperty('--mobile-title-height', `${titleHeight}px`)
    }

    updateChromeMetrics()

    const observer = new ResizeObserver(updateChromeMetrics)
    observer.observe(nav)
    observer.observe(title)

    const mq = window.matchMedia('(max-width: 900px)')
    const onViewportChange = () => {
      updateChromeMetrics()
    }

    mq.addEventListener('change', onViewportChange)
    window.addEventListener('resize', onViewportChange)
    window.visualViewport?.addEventListener('resize', onViewportChange)

    return () => {
      observer.disconnect()
      mq.removeEventListener('change', onViewportChange)
      window.removeEventListener('resize', onViewportChange)
      window.visualViewport?.removeEventListener('resize', onViewportChange)
    }
  }, [])

  return (
    <div ref={desktopRef} className={`desktop${isProjectOpen ? ' desktop--project' : ''}`}>
      <div className="desktop__inner">
        <div
          className={`content${isProjectOpen ? ' content--project' : ''}${isAboutOpen && !isAboutExiting && !isAboutEntering ? ' content--about' : ''}`}
        >
          <div className="left-content">
            <nav
              ref={navRef}
              className="side-nav"
              aria-label="Main navigation"
            >
              <div className="nav-links">
                <a href="/" onClick={handleHomeClick}>
                  <span className="nav-home-label nav-home-label--default">Home</span>
                  <span className="nav-home-label nav-home-label--project">
                    Back home
                  </span>
                </a>
                <a
                  href="#about"
                  className={isAboutOpen ? 'is-active' : undefined}
                  aria-current={isAboutOpen ? 'page' : undefined}
                  onClick={handleAboutClick}
                >
                  About
                </a>
              </div>
              <div className="contact-links">
                <a href="mailto:mimbentes@gmail.com">
                  <span className="nav-label nav-label--full">
                    <ExternalLinkArrow />
                    mimbentes@gmail.com
                  </span>
                  <span className="nav-label nav-label--short">
                    <ExternalLinkArrow />
                    Email
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/in%C3%AAs-bentes-697398215/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="nav-label nav-label--full">
                    <ExternalLinkArrow />
                    Linkedin/InesBentes
                  </span>
                  <span className="nav-label nav-label--short">
                    <ExternalLinkArrow />
                    Linkedin
                  </span>
                </a>
                <a
                  href="https://drive.google.com/file/d/10R-Qhmd6eeuoCsmJq1j_O0bktqH_t2Gd/view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="nav-label nav-label--full">
                    <ExternalLinkArrow />
                    CV
                  </span>
                  <span className="nav-label nav-label--short">
                    <ExternalLinkArrow />
                    CV
                  </span>
                </a>
              </div>

              <ProjectNavDetails
                project={isContentRevealed && !isAboutOpen ? hoveredProject : null}
              />
            </nav>

            <TitleReveal
              ref={titleRef}
              progress={resolvedTitleProgress}
              layout={titleLayout}
              hidden={titleHidden}
              instant={titleInstant}
            />
          </div>

          <div
            ref={mainContentRef}
            className={`main-content${isRevealed ? ' main-content--revealed' : ''}${isGalleryNavFading ? ' main-content--gallery-nav-fading' : ''}${isAboutGalleryHidden ? ' main-content--about-gallery-hidden' : ''}${isAboutOpen && !isAboutExiting && !isAboutEntering ? ' main-content--about' : ''}${isAboutEntering ? ' main-content--about-entering' : ''}${aboutEntered ? ' main-content--about-entered' : ''}${isAboutExiting ? ' main-content--about-exiting' : ''}${galleryAboutExitEntered ? ' main-content--gallery-about-exit-entered' : ''}${isProjectOpen ? ' main-content--project' : ''}${projectEntered ? ' main-content--project-entered' : ''}${isProjectExiting ? ' main-content--project-exiting' : ''}${galleryExitEntered ? ' main-content--gallery-exit-entered' : ''}${helloExitEntered ? ' main-content--hello-exit-entered' : ''}`}
          >
            <div className="gradients" aria-hidden={isContentRevealed || isProjectOpen}>
              <div className="gradient-band gradient-band--1">
                <div className="gradient-band__layer" />
              </div>
              <div className="gradient-band gradient-band--2">
                <div className="gradient-band__layer" />
              </div>
              <div className="gradient-band gradient-band--3">
                <div className="gradient-band__layer" />
              </div>
              <div className="gradient-band gradient-band--4">
                <div className="gradient-band__layer" />
              </div>
            </div>

            <div className="main-content__row">
              <p className="main-content__text">
                I am a product designer with a bachelor degree in Communications
                Design and a master degree in Design and Management of UX and Digital
                Services.
              </p>
              <img
                className="arrow"
                src={arrowIcon}
                alt=""
                width={28}
                height={29}
              />
            </div>

            {isProjectOpen ? (
              <div ref={projectPanelRef} className="project-panel">
                {activeProjectId === 'nokia' && <NokiaCaseStudy />}

                {activeProjectId === 'wise' && <WiseCaseStudy />}

                {activeProjectId === 'wellness' && <SphereCaseStudy />}
              </div>
            ) : null}

            {isAboutOpen ? (
              <div ref={aboutPanelRef} className="about-panel">
                <AboutSection ref={aboutSectionRef} />
              </div>
            ) : null}

            <WorkGallery
              ref={galleryRef}
              activeProjectId={isProjectExiting ? null : activeProjectId}
              onProjectHover={setHoveredProject}
              onProjectSelect={handleProjectSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
