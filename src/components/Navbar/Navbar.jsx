import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { useTheme } from '../../context/ThemeContext'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import './Navbar.css'

const navLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'Projects', to: 'projects' },
  { label: 'Education', to: 'education' },
  { label: 'Skills', to: 'skills' },
  { label: 'Resume', to: 'resume' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="hero" smooth duration={500} className="nav-logo" onClick={closeMenu}>
          &lt;<span>Madiha</span> /&gt;
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={500}
                spy
                activeClass="active"
                offset={-70}
                className="nav-link"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </li>
        </ul>

        <div className="nav-actions-mobile">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
