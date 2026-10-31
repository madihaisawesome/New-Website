import { useEffect, useState } from 'react'
import WindowContent from './WindowContent.jsx'
import './Desktop.css'

const ICONS = [
  { id: 'home', label: 'Home', kind: 'folder' },
  { id: 'projects', label: 'Projects', kind: 'folder' },
  { id: 'education', label: 'Education', kind: 'folder' },
  { id: 'skills', label: 'Skills', kind: 'folder' },
  { id: 'resume', label: 'Resume', kind: 'folder' },
  { id: 'explore', label: 'Explore', kind: 'explore' },
]

const TITLES = {
  home: 'Home',
  projects: 'Projects',
  education: 'Education',
  skills: 'Skills',
  resume: 'Resume',
}

const PATHS = {
  home: 'C:\\Home\\About.txt',
  projects: 'C:\\Projects',
  education: 'C:\\Education',
  skills: 'C:\\Skills',
  resume: 'C:\\Resume',
}

export default function Desktop({ onExplore, onShutdown }) {
  const [windows, setWindows] = useState([])
  const [startOpen, setStartOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onKey = event => {
      if (event.key !== 'Escape') return
      if (startOpen) {
        setStartOpen(false)
        return
      }
      setWindows(list => list.slice(0, -1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [startOpen])

  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  const focusWindow = id => {
    setWindows(list => {
      const existing = list.find(item => item.id === id)
      if (!existing) return list
      return [...list.filter(item => item.id !== id), existing]
    })
  }

  const openIcon = id => {
    setStartOpen(false)
    if (id === 'explore') {
      onExplore()
      return
    }
    setWindows(list => {
      const existing = list.find(item => item.id === id)
      if (existing) {
        return [...list.filter(item => item.id !== id), existing]
      }
      const step = list.length % 8
      return [...list, { id, x: 118 + step * 24, y: 12 + step * 22 }]
    })
  }

  const closeWindow = id => {
    setWindows(list => list.filter(item => item.id !== id))
  }

  const beginDrag = (event, id) => {
    if (event.button !== 0) return
    if (event.target.closest('button')) return
    event.preventDefault()
    focusWindow(id)
    const win = windows.find(item => item.id === id)
    if (!win) return
    const origin = { x: event.clientX, y: event.clientY, left: win.x, top: win.y }

    const move = ev => {
      const nextX = origin.left + ev.clientX - origin.x
      const nextY = Math.max(0, origin.top + ev.clientY - origin.y)
      setWindows(list => list.map(item => (
        item.id === id ? { ...item, x: nextX, y: nextY } : item
      )))
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <div
      className="os"
      onPointerDown={event => {
        if (!event.target.closest('.start-menu') && !event.target.closest('.start-btn')) {
          setStartOpen(false)
        }
      }}
    >
      <div className="desktop-icons">
        {ICONS.map(icon => (
          <button
            key={icon.id}
            type="button"
            className={`desk-icon ${windows.some(item => item.id === icon.id) ? 'is-open' : ''}`}
            onClick={() => openIcon(icon.id)}
          >
            {icon.kind === 'explore' ? <ExploreArt /> : <FolderArt />}
            <span>{icon.label}</span>
          </button>
        ))}
      </div>

      <p className="wallpaper-hint">Open a folder, or click Explore for the full site</p>

      {windows.map((win, index) => {
        const active = index === windows.length - 1
        return (
          <section
            key={win.id}
            className={`win ${active ? 'is-active' : ''}`}
            style={{ left: win.x, top: win.y, zIndex: 10 + index }}
            onPointerDown={() => focusWindow(win.id)}
          >
            <header className="win-titlebar" onPointerDown={event => beginDrag(event, win.id)}>
              <span>{TITLES[win.id]}</span>
              <button type="button" className="win-close" aria-label={`Close ${TITLES[win.id]}`} onClick={() => closeWindow(win.id)}>
                ×
              </button>
            </header>
            <div className="win-address">Address: {PATHS[win.id]}</div>
            <div className="win-body">
              <WindowContent id={win.id} />
            </div>
            <footer className="win-status"><span>{PATHS[win.id]}</span></footer>
          </section>
        )
      })}

      {startOpen && (
        <div className="start-menu" role="menu">
          <div className="start-banner">Madiha OS</div>
          <button type="button" role="menuitem" onClick={() => openIcon('explore')}>Explore</button>
          <button type="button" role="menuitem" onClick={onShutdown}>Shut Down</button>
        </div>
      )}

      <footer className="taskbar">
        <button
          type="button"
          className={`start-btn ${startOpen ? 'is-pressed' : ''}`}
          aria-expanded={startOpen}
          onClick={() => setStartOpen(open => !open)}
        >
          <span className="start-flag" aria-hidden="true" />
          Start
        </button>
        <div className="task-windows">
          {windows.map((win, index) => (
            <button
              key={win.id}
              type="button"
              className={index === windows.length - 1 ? 'is-active' : ''}
              onClick={() => focusWindow(win.id)}
            >
              {TITLES[win.id]}
            </button>
          ))}
        </div>
        <div className="task-clock">{time}</div>
      </footer>
    </div>
  )
}

function FolderArt() {
  return (
    <span className="folder-art" aria-hidden="true">
      <span className="folder-tab" />
      <span className="folder-body" />
    </span>
  )
}

function ExploreArt() {
  return (
    <span className="explore-art" aria-hidden="true">
      <span>www</span>
    </span>
  )
}
