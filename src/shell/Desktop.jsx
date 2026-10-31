import { useEffect, useState } from 'react'
import WindowContent from './WindowContent.jsx'
import Minesweeper from './Minesweeper.jsx'
import './Desktop.css'

const ICONS = [
  { id: 'home', label: 'Home', kind: 'paint' },
  { id: 'projects', label: 'Projects', kind: 'vscode' },
  { id: 'explore', label: 'Explore', kind: 'explorer' },
  { id: 'mail', label: 'E-mail', kind: 'mail' },
  { id: 'skills', label: 'Skills', kind: 'control' },
  { id: 'recycle', label: 'Recycle Bin', kind: 'recycle' },
  { id: 'floppy', label: '3½ Floppy (A:)', kind: 'floppy' },
  { id: 'cd', label: 'CD-ROM (D:)', kind: 'cd' },
  { id: 'education', label: 'Education', kind: 'camera' },
  { id: 'mines', label: 'Minesweeper', kind: 'mines' },
  { id: 'resume', label: 'Resume', kind: 'word' },
]

const TITLES = {
  home: 'untitled - Paint',
  projects: 'Projects — madiha',
  education: 'diploma.bmp - Windows Picture Viewer',
  skills: 'Control Panel',
  resume: 'Resume.doc - Microsoft Word',
  mines: 'Minesweeper',
  recycle: 'Recycle Bin',
  floppy: '3½ Floppy (A:)',
  cd: 'CD-ROM (D:)',
}

const VSCODE_MENUS = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']
const WORD_MENUS = ['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Table', 'Window', 'Help']
const CONTROL_MENUS = ['File', 'Edit', 'View', 'Help']

const PATHS = {
  home: 'C:\\Paint\\About.bmp',
  projects: 'C:\\Projects',
  education: 'C:\\My Pictures\\diploma.bmp',
  skills: 'Control Panel',
  resume: 'C:\\Documents\\Resume.doc',
  recycle: 'C:\\Recycle Bin',
  floppy: 'A:\\',
  cd: 'D:\\',
}

const PAINT_COLORS = [
  '#4a3040', '#8a6a78', '#c45a8c', '#ff6fa8', '#ff9ac4', '#a070c0', '#f7a8d8', '#ffd0e8',
  '#70c0b0', '#90d0a0', '#d0c070', '#d09060', '#c06060', '#b08090',
  '#ffffff', '#fff5fb', '#ffb6d0', '#ffd6e8', '#e8c8ff', '#c8d8ff', '#b8f0e8', '#d8f0c0',
  '#fff0b8', '#ffd0a8', '#ffc0c0', '#e0b0ff', '#b0c8ff', '#f0e0ff',
]

const PAINT_TOOLS = [
  'free', 'select', 'eraser', 'fill',
  'dropper', 'zoom', 'pencil', 'brush',
  'spray', 'text', 'line', 'curve',
  'rect', 'poly', 'ellipse', 'round',
]

const ICON_OFFSET = {
  computer: 0,
  folder: 32,
  internet: 64,
  mail: 96,
  control: 128,
  recycle: 160,
  floppy: 192,
  cd: 224,
  pictures: 256,
  music: 288,
  notepad: 320,
  vscode: 352,
  paint: 384,
  explorer: 416,
  word: 448,
  diploma: 480,
  camera: 512,
}

const CONTENT_IDS = new Set(['home', 'projects', 'education', 'skills', 'resume', 'mines', 'recycle', 'floppy', 'cd'])

export default function Desktop({ onExplore, onShutdown }) {
  const [windows, setWindows] = useState([])
  const [startOpen, setStartOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const [paintTool, setPaintTool] = useState('pencil')
  const [paintColor, setPaintColor] = useState('#ff6fa8')
  const [toast, setToast] = useState('')

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const id = setTimeout(() => setToast(''), 1800)
    return () => clearTimeout(id)
  }, [toast])

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
    if (id === 'mail') {
      window.location.href = 'mailto:m24049502@gmail.com'
      return
    }
    if (!CONTENT_IDS.has(id)) {
      setToast('Item not available')
      return
    }
    setWindows(list => {
      const existing = list.find(item => item.id === id)
      if (existing) {
        return [...list.filter(item => item.id !== id), existing]
      }
      const step = list.length % 8
      return [...list, { id, x: 180 + step * 24, y: 28 + step * 22 }]
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
      <div className="os-grain" aria-hidden="true" />
      <div className="os-blush" aria-hidden="true" />

      <div className="desktop-icons">
        {ICONS.map(icon => (
          <button
            key={icon.id}
            type="button"
            className={`desk-icon ${windows.some(item => item.id === icon.id) ? 'is-open' : ''}`}
            onClick={() => openIcon(icon.id)}
          >
            <IconArt kind={icon.kind} />
            <span>{icon.label}</span>
          </button>
        ))}
      </div>

      {toast && <div className="os-toast" role="status">{toast}</div>}

      {windows.map((win, index) => {
        const active = index === windows.length - 1
        const isPaint = win.id === 'home'
        const isMines = win.id === 'mines'
        const isVscode = win.id === 'projects'
        const isControl = win.id === 'skills'
        const isWord = win.id === 'resume'
        const isDiploma = win.id === 'education'
        return (
          <section
            key={win.id}
            className={`win ${active ? 'is-active' : ''} ${isPaint ? 'paint-win' : ''} ${isMines ? 'mines-win' : ''} ${isVscode ? 'vscode-win' : ''} ${isControl ? 'control-win' : ''} ${isWord ? 'word-win' : ''} ${isDiploma ? 'diploma-win' : ''}`}
            style={{ left: win.x, top: win.y, zIndex: 10 + index }}
            onPointerDown={() => focusWindow(win.id)}
          >
            <header className="win-titlebar" onPointerDown={event => beginDrag(event, win.id)}>
              <span className={isVscode ? 'vscode-title' : isWord ? 'word-title' : isDiploma ? 'diploma-title' : undefined}>
                {isVscode && <span className="vscode-logo" aria-hidden="true" />}
                {isWord && <span className="word-logo" aria-hidden="true">W</span>}
                {isDiploma && <span className="diploma-logo" aria-hidden="true" />}
                {TITLES[win.id]}
              </span>
              <div className="win-controls">
                <button type="button" className="win-ctrl" tabIndex={-1} aria-hidden="true">_</button>
                <button type="button" className="win-ctrl" tabIndex={-1} aria-hidden="true">□</button>
                <button type="button" className="win-close" aria-label={`Close ${TITLES[win.id]}`} onClick={() => closeWindow(win.id)}>
                  ×
                </button>
              </div>
            </header>

            {isPaint ? (
              <>
                <div className="paint-menubar" aria-hidden="true">
                  <span><u>F</u>ile</span>
                  <span><u>E</u>dit</span>
                  <span><u>V</u>iew</span>
                  <span><u>I</u>mage</span>
                  <span><u>C</u>olors</span>
                  <span><u>H</u>elp</span>
                </div>
                <div className="paint-workspace">
                  <div className="paint-toolbox" aria-label="Paint tools">
                    {PAINT_TOOLS.map(tool => (
                      <button
                        key={tool}
                        type="button"
                        className={`paint-tool paint-tool-${tool} ${paintTool === tool ? 'is-active' : ''}`}
                        aria-label={tool}
                        onClick={() => setPaintTool(tool)}
                      />
                    ))}
                  </div>
                  <div className="paint-canvas-wrap">
                    <div className="win-body paint-canvas">
                      <WindowContent id={win.id} accent={paintColor} />
                    </div>
                  </div>
                </div>
                <div className="paint-palette">
                  <div className="paint-swatch-active" style={{ background: paintColor }} />
                  <div className="paint-swatches">
                    {PAINT_COLORS.map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`paint-swatch ${paintColor === color ? 'is-active' : ''}`}
                        style={{ background: color }}
                        aria-label={`Color ${color}`}
                        onClick={() => setPaintColor(color)}
                      />
                    ))}
                  </div>
                </div>
                <footer className="win-status paint-status">
                  <span>For Help, click Help Topics on the Help Menu.</span>
                  <span>121 x 94</span>
                </footer>
              </>
            ) : isMines ? (
              <div className="win-body mines-body">
                <Minesweeper />
              </div>
            ) : isVscode ? (
              <>
                <div className="vscode-menubar" aria-hidden="true">
                  {VSCODE_MENUS.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="win-body vscode-body">
                  <WindowContent id={win.id} />
                </div>
              </>
            ) : isDiploma ? (
              <>
                <div className="diploma-toolbar" aria-hidden="true">
                  <span className="diploma-tool">Previous</span>
                  <span className="diploma-tool">Next</span>
                  <span className="diploma-tool is-sep" />
                  <span className="diploma-tool">Zoom In</span>
                  <span className="diploma-tool">Zoom Out</span>
                  <span className="diploma-tool is-sep" />
                  <span className="diploma-tool">Best Fit</span>
                </div>
                <div className="win-body diploma-body">
                  <WindowContent id={win.id} />
                </div>
                <footer className="win-status"><span>{PATHS.education}</span></footer>
              </>
            ) : isControl ? (
              <>
                <div className="control-menubar" aria-hidden="true">
                  {CONTROL_MENUS.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="win-address">Address: {PATHS.skills}</div>
                <div className="win-body control-body">
                  <WindowContent id={win.id} />
                </div>
                <footer className="win-status"><span>6 object(s)</span></footer>
              </>
            ) : isWord ? (
              <>
                <div className="word-menubar" aria-hidden="true">
                  {WORD_MENUS.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="word-toolbar" aria-hidden="true">
                  <span className="word-tool">New</span>
                  <span className="word-tool">Open</span>
                  <span className="word-tool">Save</span>
                  <span className="word-tool">Print</span>
                  <span className="word-tool is-sep" />
                  <span className="word-font">Times New Roman ▾</span>
                  <span className="word-font word-size">12 ▾</span>
                  <span className="word-tool is-sep" />
                  <span className="word-tool is-bold">B</span>
                  <span className="word-tool is-italic">I</span>
                  <span className="word-tool is-underline">U</span>
                  <span className="word-tool is-sep" />
                  <span className="word-tool">≡</span>
                  <span className="word-tool">≣</span>
                </div>
                <div className="word-ruler" aria-hidden="true">
                  <span className="word-ruler-mark" style={{ left: '8%' }} />
                  <span className="word-ruler-mark" style={{ left: '25%' }} />
                  <span className="word-ruler-mark" style={{ left: '50%' }} />
                  <span className="word-ruler-mark" style={{ left: '75%' }} />
                  <span className="word-ruler-mark" style={{ left: '92%' }} />
                </div>
                <div className="win-body word-body">
                  <WindowContent id={win.id} />
                </div>
                <footer className="win-status word-status">
                  <span>Page 1</span>
                  <span>Sec 1</span>
                  <span>1/1</span>
                  <span>At 1"</span>
                  <span>Ln 1</span>
                  <span>Col 1</span>
                </footer>
              </>
            ) : (
              <>
                <div className="win-address">Address: {PATHS[win.id]}</div>
                <div className="win-body">
                  <WindowContent id={win.id} />
                </div>
                <footer className="win-status"><span>{PATHS[win.id]}</span></footer>
              </>
            )}
          </section>
        )
      })}

      {startOpen && (
        <div className="start-menu" role="menu">
          <div className="start-banner">Madiha OS ♡</div>
          <button type="button" role="menuitem" onClick={() => openIcon('home')}>
            Home
          </button>
          <button type="button" role="menuitem" onClick={() => openIcon('projects')}>
            Projects
          </button>
          <button type="button" role="menuitem" onClick={() => openIcon('explore')}>
            Explore
          </button>
          <button type="button" role="menuitem" onClick={() => openIcon('mines')}>
            Minesweeper
          </button>
          <button type="button" role="menuitem" onClick={onShutdown}>
            Shut Down...
          </button>
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
              {win.id === 'home' ? 'Paint' : win.id === 'skills' ? 'Control Panel' : win.id === 'resume' ? 'Word' : win.id === 'education' ? 'diploma.bmp' : TITLES[win.id]}
            </button>
          ))}
        </div>

        <div className="task-clock">{time}</div>
      </footer>
    </div>
  )
}

function IconArt({ kind }) {
  if (kind === 'mines') {
    return <span className="icon-art icon-mines" aria-hidden="true" />
  }
  return (
    <span
      className={`icon-art icon-${kind}`}
      style={{ backgroundPosition: `-${ICON_OFFSET[kind] || 0}px 0` }}
      aria-hidden="true"
    />
  )
}
