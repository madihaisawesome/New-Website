import { useState } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import './Projects.css'

const projects = [
  {
    title: 'Sands Of The Forgotten: Qarya Al-Mansiyah',
    image: '/projects/sands-of-the-forgotten.png',
    description:
      'Game project focused on immersive world-building and interactive storytelling.',
    tags: ['Game Development'],
    github: 'https://ro.blox.com/Ebh5?af_dp=roblox%3A%2F%2Fnavigation%2Fgame_details%3FgameId%3D7580102370&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2F122046560302014',
    live: null,
    category: 'Game',
    featured: true,
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
    featured: true,
  },
  {
    title: 'Museum Database',
    image: '/projects/museum-database.png',
    description:
      'Database management system designed to organize and query museum collection data efficiently.',
    tags: ['Database Management System'],
    github: 'https://github.com/ENSF-300-Fall-2024/museum-project-system_error',
    live: null,
    category: 'Database Management System',
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
  {
    title: 'Disaster Relief Management System',
    image: '/projects/disaster-relief-management-system.png',
    description:
      'Application designed to support coordination and information management in disaster response scenarios.',
    tags: ['Application'],
    github: null,
    live: null,
    category: 'Application',
    featured: false,
  },
  {
    title: 'LED Intensity Controller',
    image: '/projects/led-intensity-controller.png',
    description:
      'Application project for controlling LED brightness levels using interactive intensity control logic.',
    tags: ['Application'],
    github: null,
    live: null,
    category: 'Application',
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
        <p className="section-subtitle">Projects from my portfolio website</p>

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
