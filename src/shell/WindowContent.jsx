import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { projects } from '../components/Projects/Projects.jsx'
import { education } from '../components/Education/Education.jsx'
import { skillGroups } from '../components/Skills/Skills.jsx'
import { experience, leadership } from '../components/Resume/Resume.jsx'

const categories = ['All', ...new Set(projects.map(project => project.category))]

function HomeDoc({ accent = '#c45a8c' }) {
  return (
    <article className="doc" style={{ '--paint-accent': accent }}>
      <span className="paint-doodle">about.bmp</span>
      <img className="about-photo" src="/profile-pic.png" alt="Madiha Khan" />
      <p className="doc-kicker">Hi there, I'm</p>
      <h2 className="doc-name">Madiha Khan</h2>
      <p className="doc-role">
        <TypeAnimation
          sequence={[
            'Software Engineering Student',
            2000,
            'Full-Stack Developer',
            2000,
            'Embedded Systems Enthusiast',
            2000,
            'Video Game Developer',
            2000,
          ]}
          wrapper="span"
          cursor
          repeat={Infinity}
        />
      </p>
      <p>
        Passionate about building creative digital experiences — whether it's full-stack web apps, interactive games, or innovative projects. A developer with a love for bringing ideas into reality.
      </p>
      <p className="doc-links">
        <a href="https://github.com/madihaisawesome" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/madiha-khan-19885a219/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:m24049502@gmail.com">Email</a>
      </p>
    </article>
  )
}

function ProjectsDoc() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(project => project.category === active)
  const [selectedTitle, setSelectedTitle] = useState(projects[0]?.title)
  const selected = filtered.find(project => project.title === selectedTitle) || filtered[0]

  return (
    <div className="explorer">
      <div className="explorer-side">
        <label className="explorer-filter">
          Folder
          <select
            value={active}
            onChange={event => {
              const next = event.target.value
              setActive(next)
              const nextList = next === 'All' ? projects : projects.filter(project => project.category === next)
              setSelectedTitle(nextList[0]?.title)
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <ul className="file-list">
          {filtered.map(project => (
            <li key={project.title}>
              <button
                type="button"
                className={selected?.title === project.title ? 'is-selected' : ''}
                onClick={() => setSelectedTitle(project.title)}
              >
                <FolderGlyph />
                {project.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selected && (
        <article className="explorer-detail">
          <img
            src={selected.image}
            alt=""
            onError={event => {
              event.currentTarget.src = '/placeholders/project-placeholder.svg'
            }}
          />
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <p className="doc-tags">{selected.tags.join(' · ')}</p>
          <p className="doc-links">
            {selected.github && (
              <a href={selected.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            )}
            {selected.live && (
              <a href={selected.live} target="_blank" rel="noopener noreferrer">Live</a>
            )}
          </p>
        </article>
      )}
    </div>
  )
}

function EducationDoc() {
  return (
    <article className="doc">
      {education.map(item => (
        <section key={item.degree} className="doc-block">
          <h3>{item.degree}</h3>
          <p>{item.institution}</p>
          <p className="doc-meta">{item.location} · {item.period}</p>
          <ul>
            {item.highlights.map(highlight => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  )
}

function SkillsDoc() {
  return (
    <article className="doc skills-doc">
      {skillGroups.map(group => (
        <section key={group.category}>
          <h3>{group.category}</h3>
          <ul>
            {group.skills.map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  )
}

function ResumeDoc() {
  return (
    <article className="doc">
      <section className="doc-block">
        <h3>Work Experience</h3>
        {experience.map(item => (
          <div key={item.role} className="doc-entry">
            <strong>{item.role}</strong>
            <p>{item.organization}</p>
            <p className="doc-meta">{item.period}</p>
            <ul>
              {item.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="doc-block">
        <h3>Leadership</h3>
        {leadership.map(item => (
          <div key={item.role} className="doc-entry">
            <strong>{item.role}</strong>
            <p>{item.organization}</p>
            <p className="doc-meta">{item.period}</p>
            <ul>
              {item.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <p>
        <a className="win-btn" href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
          Download Resume
        </a>
      </p>
    </article>
  )
}

function FolderGlyph() {
  return (
    <span className="mini-folder" aria-hidden="true">
      <span />
    </span>
  )
}

const CONTENT = {
  home: HomeDoc,
  projects: ProjectsDoc,
  education: EducationDoc,
  skills: SkillsDoc,
  resume: ResumeDoc,
}

export default function WindowContent({ id, accent }) {
  const View = CONTENT[id]
  if (!View) return null
  return <View accent={accent} />
}
