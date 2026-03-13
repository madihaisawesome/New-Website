import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import { Link } from 'react-scroll'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Animated blobs */}
      <div className="hero-blob blob-1" />
      <div className="hero-blob blob-2" />

      <div className="hero-content container">
        <div className="hero-layout">
          <div className="hero-photo-wrap">
            <img
              src="https://madihasportfolio.vercel.app/assets/profile-pic-CVQwCG2P.png"
              alt="Madiha Khan"
              className="hero-photo"
            />
          </div>

          <div className="hero-text-content">
            <p className="hero-greeting">Hi there, I'm</p>
            <h1 className="hero-name">Madiha Khan</h1>
            <div className="hero-role">
              <TypeAnimation
                sequence={[
                  'Software Engineer',
                  2000,
                  'Software Engineering Student',
                  2000,
                  'Game Development Enthusiast',
                  2000,
                  'Problem Solver',
                  2000,
                ]}
                wrapper="span"
                cursor
                repeat={Infinity}
                className="typed-text"
              />
            </div>

            <p className="hero-bio">
              Third-year Software Engineering student at UCalgary, passionate about building elegant solutions to real-world problems.
            </p>

            <div className="hero-actions">
              <Link to="projects" smooth duration={500} offset={-70}>
                <button className="accent-btn">View My Work</button>
              </Link>
              <Link to="contact" smooth duration={500} offset={-70}>
                <button className="outline-btn">Get In Touch</button>
              </Link>
            </div>

            <div className="hero-socials">
              <a href="https://github.com/madihaisawesome" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/madiha-khan-19885a219/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a href="mailto:m24049502@gmail.com" aria-label="Email">
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Link to="projects" smooth duration={500} offset={-70} className="scroll-hint">
        <FiArrowDown size={20} />
      </Link>
    </section>
  )
}
