import { useEffect, useRef } from 'react'
import './PixelBuddy.css'

export default function PixelBuddy() {
  const buddyRef = useRef(null)

  useEffect(() => {
    const buddy = buddyRef.current
    if (!buddy) return

    let frameId = null
    let peckTimeoutId = null
    let currentX = 80
    let currentY = window.innerHeight - 180
    let targetX = currentX
    let targetY = currentY

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const clampToViewport = (x, y) => {
      const buddyWidth = buddy.offsetWidth || 72
      const buddyHeight = buddy.offsetHeight || 72
      const minX = 8
      const minY = 8
      const maxX = window.innerWidth - buddyWidth - 8
      const maxY = window.innerHeight - buddyHeight - 8

      return {
        x: Math.min(Math.max(x, minX), maxX),
        y: Math.min(Math.max(y, minY), maxY),
      }
    }

    const updateTargetFromCursor = event => {
      const desiredX = event.clientX + 16
      const desiredY = event.clientY + 16
      const clamped = clampToViewport(desiredX, desiredY)
      targetX = clamped.x
      targetY = clamped.y
    }

    const handleResize = () => {
      const clamped = clampToViewport(targetX, targetY)
      targetX = clamped.x
      targetY = clamped.y
    }

    const triggerPeck = () => {
      buddy.classList.remove('pecking')
      void buddy.offsetWidth
      buddy.classList.add('pecking')

      if (peckTimeoutId) {
        clearTimeout(peckTimeoutId)
      }

      peckTimeoutId = setTimeout(() => {
        buddy.classList.remove('pecking')
      }, 220)
    }

    const animate = () => {
      if (prefersReducedMotion) {
        currentX = targetX
        currentY = targetY
      } else {
        currentX = currentX + (targetX - currentX) * 0.1
        currentY = currentY + (targetY - currentY) * 0.1
      }

      buddy.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`
      frameId = requestAnimationFrame(animate)
    }

    handleResize()
    animate()

    window.addEventListener('mousemove', updateTargetFromCursor, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('pointerdown', triggerPeck, { passive: true })

    return () => {
      window.removeEventListener('mousemove', updateTargetFromCursor)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointerdown', triggerPeck)
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
      if (peckTimeoutId) {
        clearTimeout(peckTimeoutId)
      }
    }
  }, [])

  return (
    <div className="pixel-buddy" ref={buddyRef} aria-hidden="true">
      <img src="/placeholders/pixel-buddy.svg" alt="" className="pixel-buddy-sprite" />
    </div>
  )
}
