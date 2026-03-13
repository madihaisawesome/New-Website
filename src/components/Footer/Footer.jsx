import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { Link } from 'react-scroll'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner container">
        <Link to="hero" smooth duration={500} className="footer-logo">
          &lt;<span>Madiha</span> /&gt;
        </Link>

        <p className="footer-tagline">Software Engineer · Calgary, Canada</p>

        <div className="footer-socials">
          <a href="https://github.com/madihaisawesome" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub size={18} /></a>
          <a href="https://linkedin.com/in/madiha-khan-19885a219/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin size={18} /></a>
          <a href="mailto:m24049502@gmail.com" aria-label="Email"><FiMail size={18} /></a>
        </div>

        <p className="footer-copy">
          © {year} Madiha. Made with <FiHeart size={13} className="heart" /> in React.
        </p>
      </div>
    </footer>
  )
}
