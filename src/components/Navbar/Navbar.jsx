import { useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import './Navbar.css'

export default function Navbar({ time }) {
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const jumpTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }
  const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  return (
    <header className="mac-menu-bar">
      <button type="button" className="apple-mark" onClick={() => jumpTo('hero')} aria-label="Go to About Me">●</button>
      <button type="button" className="menu-name" onClick={() => jumpTo('hero')}>Madiha</button>
      <button type="button" className="menu-item menu-about" onClick={() => jumpTo('hero')}>About</button>
      <button type="button" className="menu-item menu-work" onClick={() => jumpTo('projects')}>Work</button>
      <button type="button" className="menu-item menu-contact" onClick={() => jumpTo('contact')}>Contact</button>
      <div className="menu-right">
        <button type="button" className="menu-mode" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <FiSun size={14} /> : <FiMoon size={14} />}
        </button>
        <button type="button" className="menu-clock" onClick={() => setMenuOpen(value => !value)} aria-label="Show desktop menu">
          {formattedTime}
        </button>
      </div>
      {menuOpen && (
        <div className="mac-quick-menu">
          <span>madiha.dev</span>
          <span>Calgary, AB</span>
          <span className="menu-status">available for good ideas</span>
        </div>
      )}
    </header>
  )
}
