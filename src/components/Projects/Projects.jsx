import { useState } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import './Projects.css'

const projects = [
  {
    title: 'Sweet Scoop',
    image: '/projects/sweet-scoop-screenshot.png',
    description:
      'Full-stack ice cream ordering app built with React and Flask, featuring signup, login, cart, and order history.',
    tags: ['React', 'Flask', 'REST API'],
    github: null,
    live: 'https://sweet-scoop-6mpps17c3-madihaisawesomes-projects.vercel.app/',
    category: 'Application',
    featured: true,
  },
  {
    title: 'LastSeen Mobile Application',
    image: '/projects/lastseen-mobile-app.png',
    description:
      '4th place Hackathon Winner: A room-memory app that helps you find misplaced items by combining camera scans, visual event tracking, and natural-language search.',
    tags: ['React Native', 'Expo', 'FastAPI'],
    github: 'https://github.com/Mudafa/lastseen/tree/main',
    live: 'null',
    category: 'Application',
    featured: true,
  },
  {
    title: 'Fishtank Timer',
    image: '/projects/fishtank-timer.png',
    description:
      'An interactive fishtank timer application for tracking time with visual appeal.',
    tags: ['React', 'Web Development'],
    github: null,
    live: 'https://fishtank-timer.vercel.app/',
    category: 'Application',
    featured: false,
  },
  {
    title: 'Machine Learning Project',
    image: '/projects/machine-learning-project.png',
    description:
      'A machine learning project focused on implementing and training neural networks for image classification.',
    tags: ['Python', 'TensorFlow', 'Scikit-learn'],
    github: 'https://github.com/madihaisawesome/ENSF-444-Project',
    live: null,
    category: 'Application',
    featured: false,
  },
  {
    title: 'Sands Of The Forgotten: Qarya Al-Mansiyah',
    image: '/projects/sands-of-the-forgotten.png',
    description:
      'Game project focused on immersive world-building and interactive storytelling.',
    tags: ['Game Development'],
    github: null,
    live: 'https://ro.blox.com/Ebh5?af_dp=roblox%3A%2F%2Fnavigation%2Fgame_details%3FgameId%3D7580102370&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2F122046560302014',
    category: 'Game',
    featured: false,
  },
  {
    title: 'Flight Reservation System',
    image: '/projects/flight-reservation-system.png',
    description:
      'Application project for handling reservations, schedules, and booking workflows.',
    tags: ['Application'],
    github: 'https://github.com/azlfa-anwar/ensf480/tree/main?search=1',
    live: null,
    category: 'Application',
    featured: false,
  },
  {
    title: 'Count Down Timer App',
    image: '/projects/countdown-timer-app.jpg',
    description:
      'Embedded systems project built around timer logic, event triggers, and hardware interaction.',
    tags: ['Embedded Systems'],
    github: 'https://github.com/users/madihaisawesome/projects/1',
    live: null,
    category: 'Embedded Systems',
    featured: false,
  },
]

const categories = ['All', ...new Set(projects.map(p => p.category))]

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">My <span>Projects</span></h2>
        <div className="divider" />

        {/* Filter tabs */}
        <div className="project-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${active === cat ? 'filter-active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="projects-grid">
          {filtered.map(project => (
            <div key={project.title} className={`project-card ${project.featured ? 'featured' : ''}`}>
              {project.featured && <div className="featured-badge">Featured</div>}
              <div className="card-top">
                <div className="card-image-wrap">
                  <img src={project.image} alt={`${project.title} preview`} className="card-image" />
                </div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>
              </div>
              <div className="card-bottom">
                <div className="card-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="card-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-link" title="GitHub">
                      <FiGithub size={17} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="card-link" title="Live Demo">
                      <FiExternalLink size={17} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <a href="https://github.com/madihaisawesome" target="_blank" rel="noopener noreferrer" className="outline-btn">
            <FiGithub size={17} /> View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  )
}
