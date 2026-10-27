import { useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiBookOpen, FiFolder, FiGlobe, FiMail, FiMonitor, FiMusic, FiSettings, FiTrash2 } from 'react-icons/fi'
import { ThemeProvider } from './context/ThemeContext'
import Hero from './components/Hero/Hero'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Resume from './components/Resume/Resume'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import PixelBuddy from './components/PixelBuddy/PixelBuddy'
import './App.css'

const desktopIcons = [
  { id: 'computer', label: 'My Computer', glyph: '▣', target: 'hero', window: 'My Computer' },
  { id: 'floppy', label: '3½ Floppy (A:)', glyph: 'A:', target: 'resume', window: 'Resume.pdf' },
  { id: 'documents', label: 'My Documents', icon: FiFolder, target: 'projects', window: 'Documents' },
  { id: 'cd', label: 'CD-ROM (D:)', glyph: 'D:', target: 'skills', window: 'Skills' },
  { id: 'internet', label: 'Internet', icon: FiGlobe, target: 'contact', window: 'Internet Explorer' },
  { id: 'pictures', label: 'Pictures', glyph: '▧', target: 'projects', window: 'Pictures' },
  { id: 'email', label: 'eMail', icon: FiMail, target: 'contact', window: 'eMail' },
  { id: 'music', label: 'Music', icon: FiMusic, target: 'skills', window: 'Music Player' },
  { id: 'control', label: 'Control Panel', icon: FiSettings, target: 'skills', window: 'Control Panel' },
  { id: 'notepad', label: 'Notepad', icon: FiBookOpen, target: 'hero', window: 'about-me.txt' },
]

function DeskScene({ onEnter }) {
  return (
    <section className="desk-scene" aria-label="Cozy work desk">
      <img className="desk-art" src="/portfolio-room.png" alt="Pixel-art nighttime workspace" />
      <button type="button" className="monitor-hotspot" onClick={onEnter} aria-label="Enter portfolio" />
    </section>
  )
}

function BootSequence() {
  return (
    <section className="boot-scene" aria-label="Computer starting">
      <div className="boot-screen">
        <span className="boot-mark">M</span>
        <p>madiha computer systems</p>
        <div className="boot-progress"><i /></div>
        <small>loading desktop...</small>
      </div>
    </section>
  )
}

function DesktopIcon({ item, selected, onSelect, onOpen }) {
  const Icon = item.icon
  return (
    <button type="button" className={`os-icon ${selected ? 'selected' : ''}`} onClick={() => onSelect(item.id)} onDoubleClick={() => onOpen(item)} title={`Double-click to open ${item.window}`}>
      <span className="os-icon-image">{Icon ? <Icon size={25} /> : item.glyph}</span>
      <span>{item.label}</span>
    </button>
  )
}

function RetroWindow({ windowData, onClose, onOpenSection }) {
  const [position, setPosition] = useState({ x: windowData.x, y: windowData.y })
  const dragOrigin = useRef(null)

  const startDrag = event => {
    dragOrigin.current = { mouseX: event.clientX, mouseY: event.clientY, x: position.x, y: position.y }
    const move = moveEvent => {
      if (!dragOrigin.current) return
      setPosition({ x: dragOrigin.current.x + moveEvent.clientX - dragOrigin.current.mouseX, y: dragOrigin.current.y + moveEvent.clientY - dragOrigin.current.mouseY })
    }
    const stop = () => {
      dragOrigin.current = null
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', stop)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', stop)
  }

  return (
    <section className="retro-window" style={{ transform: `translate(${position.x}px, ${position.y}px)` }}>
      <header className="retro-window-title" onMouseDown={startDrag}>
        <span>{windowData.title}</span>
        <div><button type="button" aria-label="Minimize">_</button><button type="button" aria-label="Maximize">□</button><button type="button" aria-label="Close" onClick={onClose}>×</button></div>
      </header>
      <div className="retro-window-body">
        <div className="retro-window-icon"><FiMonitor size={28} /></div>
        <h2>{windowData.title}</h2>
        <p>{windowData.copy}</p>
        <button type="button" className="retro-action" onClick={() => onOpenSection(windowData.target)}>Open section</button>
      </div>
    </section>
  )
}

function RetroDesktop({ onExit }) {
  const [time, setTime] = useState(new Date())
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [openWindows, setOpenWindows] = useState([])

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    const escape = event => event.key === 'Escape' && onExit()
    window.addEventListener('keydown', escape)
    return () => { window.clearInterval(timer); window.removeEventListener('keydown', escape) }
  }, [onExit])

  const openSection = target => {
    setOpenWindows([])
    window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)
  }

  const openIcon = item => {
    setOpenWindows(current => [...current.filter(windowData => windowData.id !== item.id), {
      id: item.id,
      title: item.window,
      target: item.target,
      x: 220 + current.length * 22,
      y: 90 + current.length * 20,
      copy: item.id === 'notepad' ? 'A curious software engineering student building playful digital experiences.' : `This window connects to Madiha's ${item.target} section.`,
    }])
  }

  return (
    <section className="retro-desktop" aria-label="Retro operating system desktop">
      <div className="os-clouds" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="os-icons">{desktopIcons.map(item => <DesktopIcon key={item.id} item={item} selected={selectedIcon === item.id} onSelect={setSelectedIcon} onOpen={openIcon} />)}</div>
      <button type="button" className="recycle-bin os-icon" onClick={() => setSelectedIcon('recycle')}><span className="os-icon-image"><FiTrash2 size={25} /></span><span>Recycle Bin</span></button>
      <div className="os-content"><Hero /><Projects /><Skills /><Resume /><Contact /><Footer /></div>
      {openWindows.map(windowData => <RetroWindow key={windowData.id} windowData={windowData} onClose={() => setOpenWindows(current => current.filter(item => item.id !== windowData.id))} onOpenSection={openSection} />)}
      <div className="os-taskbar">
        <button type="button" className="os-start" onClick={() => setStartOpen(value => !value)}><b>⊞</b> Start</button>
        <button type="button" className="os-task" onClick={() => openSection('hero')}>▣ My Computer</button>
        <button type="button" className="os-task task-hidden" onClick={() => openSection('projects')}>▰ Documents</button>
        <button type="button" className="os-task task-hidden" onClick={() => openSection('contact')}>◎ Internet</button>
        <button type="button" className="os-task task-hidden" onClick={() => openSection('skills')}>⚙ Settings</button>
        <span className="os-clock">{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
      </div>
      {startOpen && <div className="os-start-menu"><strong>MADIHA</strong><button type="button" onClick={() => openSection('hero')}>About Me</button><button type="button" onClick={() => openSection('projects')}>My Work</button><button type="button" onClick={() => openSection('resume')}>Resume.pdf</button><button type="button" onClick={onExit}><FiArrowLeft size={13} /> Exit to Desk</button></div>}
      <button type="button" className="exit-desktop" onClick={onExit}>Esc / Exit to Desk</button>
    </section>
  )
}

function App() {
  const [scene, setScene] = useState('desk')

  const enterDesktop = () => {
    setScene('booting')
    window.setTimeout(() => setScene('desktop'), 1100)
  }

  return (
    <ThemeProvider>
      <div className={`app scene-${scene}`}>
        {scene === 'desk' && <DeskScene onEnter={enterDesktop} />}
        {scene === 'booting' && <BootSequence />}
        {scene === 'desktop' && <RetroDesktop onExit={() => setScene('desk')} />}
        <PixelBuddy />
      </div>
    </ThemeProvider>
  )
}

export default App
