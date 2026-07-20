import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'

const SWIPE_THRESHOLD = 40
const REVEAL_LOCK_MS = 800
const GESTURE_IDLE_MS = 120

const isMobileLayout = () =>
  window.matchMedia('(max-width: 900px)').matches

function getWheelDelta(event: WheelEvent) {
  let delta = event.deltaY

  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    delta *= 16
  } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    delta *= window.innerHeight
  }

  return delta
}

function canScrollContainer(container: HTMLElement) {
  return container.scrollHeight > container.clientHeight + 1
}

function canScrollContainerInDirection(container: HTMLElement, delta: number) {
  if (!canScrollContainer(container)) return false

  const atTop = container.scrollTop <= 1
  const atBottom =
    container.scrollTop + container.clientHeight >= container.scrollHeight - 1

  if (delta < 0 && atTop) return false
  if (delta > 0 && atBottom) return false

  return true
}

export function useTitleRevealTrigger(
  galleryRef: RefObject<HTMLElement | null>,
  options?: {
    blocked?: boolean
    mainContentRef?: RefObject<HTMLElement | null>
    blockedScrollRef?: RefObject<HTMLElement | null>
  },
) {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(progress)
  const lockedUntilRef = useRef(0)
  const galleryScrollUnlockedRef = useRef(false)
  const lastGestureAtRef = useRef(0)
  const touchStartScrollTopRef = useRef(0)
  const blockedRef = useRef(options?.blocked ?? false)
  const mainContentRef = useRef(options?.mainContentRef?.current ?? null)
  const blockedScrollRef = useRef(options?.blockedScrollRef?.current ?? null)

  blockedRef.current = options?.blocked ?? false
  mainContentRef.current = options?.mainContentRef?.current ?? null
  blockedScrollRef.current = options?.blockedScrollRef?.current ?? null
  progressRef.current = progress

  const resetGalleryScroll = useCallback(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    gallery.scrollTo({ top: 0, behavior: 'instant' })
  }, [galleryRef])

  const goHome = useCallback(() => {
    lockedUntilRef.current = Date.now() + REVEAL_LOCK_MS
    galleryScrollUnlockedRef.current = false
    lastGestureAtRef.current = Date.now()
    progressRef.current = 0
    setProgress(0)
    resetGalleryScroll()

    if (isMobileLayout()) {
      window.scrollTo(0, 0)
    }
  }, [resetGalleryScroll])

  useEffect(() => {
    let touchStartY = 0

    const reveal = (direction: 'down' | 'up') => {
      lockedUntilRef.current = Date.now() + REVEAL_LOCK_MS
      galleryScrollUnlockedRef.current = false
      lastGestureAtRef.current = Date.now()

      if (direction === 'down') {
        if (isMobileLayout()) {
          window.scrollTo(0, 0)
        }
        progressRef.current = 1
        setProgress(1)
        requestAnimationFrame(resetGalleryScroll)
        return
      }

      progressRef.current = 0
      setProgress(0)
      resetGalleryScroll()
    }

    const isGalleryAtTop = (gallery: HTMLElement) => gallery.scrollTop <= 1

    const isGalleryAtBottom = (gallery: HTMLElement) =>
      gallery.scrollTop + gallery.clientHeight >= gallery.scrollHeight - 1

    const isNewGesture = (now: number) =>
      now - lastGestureAtRef.current >= GESTURE_IDLE_MS

    const unlockGalleryScroll = () => {
      galleryScrollUnlockedRef.current = true
      resetGalleryScroll()
    }

    const handleLockedGalleryWheel = (event: WheelEvent, now: number) => {
      const gallery = galleryRef.current
      if (!gallery) return

      if (!isNewGesture(now)) return

      if (event.deltaY < 0 && isGalleryAtTop(gallery)) {
        lastGestureAtRef.current = now
        reveal('up')
        return
      }

      if (event.deltaY > 0) {
        lastGestureAtRef.current = now
        unlockGalleryScroll()
        event.preventDefault()
        gallery.scrollBy({ top: getWheelDelta(event), behavior: 'instant' })
      }
    }

    const onWheel = (event: WheelEvent) => {
      if (blockedRef.current) {
        const scrollContainer =
          blockedScrollRef.current ?? mainContentRef.current
        if (!scrollContainer) return

        const delta = getWheelDelta(event)
        if (!canScrollContainerInDirection(scrollContainer, delta)) return

        event.preventDefault()
        scrollContainer.scrollBy({ top: delta, behavior: 'instant' })
        return
      }

      const gallery = galleryRef.current
      const current = progressRef.current
      const now = Date.now()
      const mobile = isMobileLayout()

      if (current === 1 && gallery) {
        if (now < lockedUntilRef.current || !galleryScrollUnlockedRef.current) {
          event.preventDefault()
          if (now >= lockedUntilRef.current) {
            handleLockedGalleryWheel(event, now)
          }
          return
        }

        const atTop = isGalleryAtTop(gallery)
        const atBottom = isGalleryAtBottom(gallery)
        const scrollingUp = event.deltaY < 0
        const scrollingDown = event.deltaY > 0

        if (scrollingUp && atTop) {
          event.preventDefault()
          if (isNewGesture(now)) {
            lastGestureAtRef.current = now
            reveal('up')
          }
          return
        }

        if (scrollingDown && atBottom) {
          event.preventDefault()
          return
        }

        const overGallery = gallery.contains(event.target as Node)
        if (overGallery) {
          return
        }

        event.preventDefault()
        gallery.scrollBy({ top: getWheelDelta(event), behavior: 'instant' })
        return
      }

      if (mobile) {
        event.preventDefault()

        if (Math.abs(event.deltaY) < 2) return

        lastGestureAtRef.current = now
        reveal(event.deltaY > 0 ? 'down' : 'up')
        return
      }

      event.preventDefault()

      if (Math.abs(event.deltaY) < 2) return

      lastGestureAtRef.current = now
      reveal(event.deltaY > 0 ? 'down' : 'up')
    }

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return

      touchStartY = touch.clientY
      touchStartScrollTopRef.current = galleryRef.current?.scrollTop ?? 0
    }

    const onGalleryTouchMove = (event: TouchEvent) => {
      if (blockedRef.current) return
      if (progressRef.current !== 1) return

      const now = Date.now()
      if (
        now < lockedUntilRef.current ||
        !galleryScrollUnlockedRef.current
      ) {
        event.preventDefault()
      }
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (blockedRef.current) return

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY
      const deltaY = touchStartY - touchEndY
      const gallery = galleryRef.current
      const current = progressRef.current
      const now = Date.now()

      if (current === 1 && gallery) {
        const atTop = isGalleryAtTop(gallery)
        const startedAtTop = touchStartScrollTopRef.current <= 0

        if (!galleryScrollUnlockedRef.current) {
          if (now < lockedUntilRef.current) {
            return
          }

          if (!isNewGesture(now)) return

          if (deltaY < -SWIPE_THRESHOLD && atTop && startedAtTop) {
            lastGestureAtRef.current = now
            reveal('up')
          } else if (deltaY > SWIPE_THRESHOLD) {
            lastGestureAtRef.current = now
            unlockGalleryScroll()
          }

          return
        }

        if (
          atTop &&
          startedAtTop &&
          deltaY < -SWIPE_THRESHOLD &&
          isNewGesture(now)
        ) {
          lastGestureAtRef.current = now
          reveal('up')
        }

        return
      }

      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return

      lastGestureAtRef.current = now
      reveal(deltaY > 0 ? 'down' : 'up')
    }

    const gallery = galleryRef.current

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    gallery?.addEventListener('touchmove', onGalleryTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      gallery?.removeEventListener('touchmove', onGalleryTouchMove)
    }
  }, [galleryRef, options?.blocked, options?.mainContentRef, options?.blockedScrollRef, resetGalleryScroll])

  return { progress, goHome }
}
