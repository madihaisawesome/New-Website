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

function projectFileName(project) {
  const words = project.title.match(/[A-Za-z0-9]+/g) || ['project']
  const base = words.slice(0, 3).join('')
  if (project.category === 'Machine Learning' || project.tags.some(tag => /python|tensor|scikit/i.test(tag))) {
    return `${base}.py`
  }
  if (project.category === 'Game') return `${base}.lua`
  if (project.tags.some(tag => /react native|expo/i.test(tag))) return `${base}.tsx`
  if (project.tags.some(tag => /react/i.test(tag))) return `${base}.jsx`
  if (project.tags.some(tag => /flask|fastapi|python/i.test(tag))) return `${base}.py`
  return `${base}.md`
}

function fileExtClass(name) {
  const ext = name.split('.').pop()
  return `vscode-file-${ext}`
}

function ProjectsDoc() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(project => project.category === active)
  const [selectedTitle, setSelectedTitle] = useState(projects[0]?.title)
  const selected = filtered.find(project => project.title === selectedTitle) || filtered[0]
  const selectedFile = selected ? projectFileName(selected) : 'README.md'
  const openFolders = categories.filter(category => category !== 'All')

  return (
    <div className="vscode-app">
      <nav className="vscode-activity" aria-label="Activity bar">
        <button type="button" className="is-active" aria-label="Explorer" title="Explorer">
          <span className="vscode-ico vscode-ico-files" />
        </button>
        <button type="button" aria-label="Search" title="Search" tabIndex={-1}>
          <span className="vscode-ico vscode-ico-search" />
        </button>
        <button type="button" aria-label="Source Control" title="Source Control" tabIndex={-1}>
          <span className="vscode-ico vscode-ico-git" />
        </button>
        <button type="button" aria-label="Extensions" title="Extensions" tabIndex={-1}>
          <span className="vscode-ico vscode-ico-ext" />
        </button>
      </nav>

      <aside className="vscode-sidebar">
        <div className="vscode-sidebar-head">
          <span>Explorer</span>
          <span className="vscode-sidebar-actions" aria-hidden="true">···</span>
        </div>
        <div className="vscode-workspace">
          <button type="button" className="vscode-root" aria-expanded="true">
            <span className="vscode-chevron" aria-hidden="true" />
            PROJECTS
          </button>
          <div className="vscode-filters" role="tablist" aria-label="Project categories">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active === category}
                className={active === category ? 'is-active' : ''}
                onClick={() => {
                  setActive(category)
                  const nextList = category === 'All' ? projects : projects.filter(project => project.category === category)
                  setSelectedTitle(nextList[0]?.title)
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <ul className="vscode-tree">
            {openFolders
              .filter(category => active === 'All' || active === category)
              .map(category => (
                <li key={category} className="vscode-folder">
                  <div className="vscode-folder-label">
                    <span className="vscode-chevron" aria-hidden="true" />
                    <span className="vscode-folder-ico" aria-hidden="true" />
                    {category}
                  </div>
                  <ul>
                    {projects
                      .filter(project => project.category === category)
                      .filter(project => active === 'All' || active === category)
                      .map(project => {
                        const name = projectFileName(project)
                        return (
                          <li key={project.title}>
                            <button
                              type="button"
                              className={`vscode-file ${fileExtClass(name)} ${selected?.title === project.title ? 'is-selected' : ''}`}
                              onClick={() => setSelectedTitle(project.title)}
                            >
                              <span className="vscode-file-ico" aria-hidden="true" />
                              {name}
                            </button>
                          </li>
                        )
                      })}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </aside>

      <div className="vscode-editor">
        <div className="vscode-tabs" role="tablist" aria-label="Open editors">
          {selected && (
            <button type="button" className="vscode-tab is-active" role="tab" aria-selected="true">
              <span className={`vscode-file-ico ${fileExtClass(selectedFile)}`} aria-hidden="true" />
              {selectedFile}
              <span className="vscode-tab-x" aria-hidden="true">×</span>
            </button>
          )}
          <button type="button" className="vscode-tab" role="tab" aria-selected="false" tabIndex={-1}>
            <span className="vscode-file-ico vscode-file-md" aria-hidden="true" />
            README.md
          </button>
        </div>

        {selected && (
          <article className="vscode-pane">
            <div className="vscode-breadcrumb">
              <span>projects</span>
              <span>/</span>
              <span>{selected.category}</span>
              <span>/</span>
              <span>{selectedFile}</span>
            </div>
            <div className="vscode-readme">
              <img
                src={selected.image}
                alt=""
                onError={event => {
                  event.currentTarget.src = '/placeholders/project-placeholder.svg'
                }}
              />
              <h3># {selected.title}</h3>
              <p className="vscode-meta">
                <span className="vscode-badge">{selected.category}</span>
                {selected.featured && <span className="vscode-badge vscode-badge-hot">featured</span>}
              </p>
              <p>{selected.description}</p>
              <p className="vscode-code-line">
                <span className="vscode-kw">const</span> tags = [
                {selected.tags.map((tag, index) => (
                  <span key={tag}>
                    <span className="vscode-str">&apos;{tag}&apos;</span>
                    {index < selected.tags.length - 1 ? ', ' : ''}
                  </span>
                ))}
                ];
              </p>
              <div className="vscode-links">
                {selected.github && (
                  <a href={selected.github} target="_blank" rel="noopener noreferrer">Open GitHub ↗</a>
                )}
                {selected.live && (
                  <a href={selected.live} target="_blank" rel="noopener noreferrer">Open Live ↗</a>
                )}
              </div>
            </div>
          </article>
        )}
      </div>

      <footer className="vscode-statusbar">
        <span>⎇ main*</span>
        <span>0 ⚠ 0</span>
        <span className="vscode-statusbar-right">Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>{selectedFile.split('.').pop()?.toUpperCase()}</span>
      </footer>
    </div>
  )
}

function EducationDoc() {
  return (
    <div className="diploma-viewer">
      {education.map(item => (
        <article key={item.degree} className="diploma-frame">
          <div className="diploma-ornament diploma-ornament-tl" aria-hidden="true" />
          <div className="diploma-ornament diploma-ornament-tr" aria-hidden="true" />
          <div className="diploma-ornament diploma-ornament-bl" aria-hidden="true" />
          <div className="diploma-ornament diploma-ornament-br" aria-hidden="true" />

          <p className="diploma-seal" aria-hidden="true">★</p>
          <p className="diploma-eyebrow">Certificate of Enrollment</p>
          <h2 className="diploma-name">Madiha Khan</h2>
          <p className="diploma-script">is presently pursuing</p>
          <h3 className="diploma-degree">{item.degree}</h3>
          <p className="diploma-school">{item.institution}</p>
          <p className="diploma-meta">{item.location} · {item.period}</p>
          <ul className="diploma-notes">
            {item.highlights.map(highlight => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className="diploma-signoff">
            <div>
              <span className="diploma-sig">M. Khan</span>
              <em>Candidate</em>
            </div>
            <div className="diploma-badge" aria-hidden="true">
              <span>SE</span>
            </div>
            <div>
              <span className="diploma-sig">UCalgary</span>
              <em>Institution</em>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function SkillsDoc() {
  const [selected, setSelected] = useState(skillGroups[0]?.category)
  const active = skillGroups.find(group => group.category === selected) || skillGroups[0]

  return (
    <div className="control-panel">
      <aside className="control-side">
        <p className="control-side-title">Categories</p>
        <ul className="control-cats">
          {skillGroups.map(group => (
            <li key={group.category}>
              <button
                type="button"
                className={active?.category === group.category ? 'is-selected' : ''}
                onClick={() => setSelected(group.category)}
              >
                <span className="control-applet-ico" aria-hidden="true" />
                {group.category}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="control-main">
        <header className="control-main-head">
          <h3>{active.category}</h3>
          <p>Double-click an item to view details. All systems currently installed.</p>
        </header>
        <div className="control-grid">
          {active.skills.map(skill => (
            <button key={skill} type="button" className="control-applet">
              <span className="control-applet-glyph" aria-hidden="true" />
              <span>{skill}</span>
              <em>Installed</em>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ResumeDoc() {
  return (
    <div className="word-page">
      <header className="word-doc-header">
        <h2>Madiha Khan</h2>
        <p>Software Engineering Student</p>
        <p className="word-doc-contact">
          <span>m24049502@gmail.com</span>
          <span>github.com/madihaisawesome</span>
          <span>linkedin.com/in/madiha-khan</span>
        </p>
      </header>

      <section className="word-doc-section">
        <h3>Work Experience</h3>
        {experience.map(item => (
          <div key={item.role} className="word-doc-entry">
            <div className="word-doc-row">
              <strong>{item.role}</strong>
              <span>{item.period}</span>
            </div>
            <p className="word-doc-org">{item.organization}</p>
            <ul>
              {item.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="word-doc-section">
        <h3>Leadership</h3>
        {leadership.map(item => (
          <div key={item.role} className="word-doc-entry">
            <div className="word-doc-row">
              <strong>{item.role}</strong>
              <span>{item.period}</span>
            </div>
            <p className="word-doc-org">{item.organization}</p>
            <ul>
              {item.bullets.map(bullet => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <p className="word-doc-download">
        <a className="win-btn" href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
          Download Resume.pdf
        </a>
      </p>
    </div>
  )
}

const RECYCLE_ITEMS = [
  {
    name: 'bad_commit_messages.txt',
    detail: '“fix stuff”, “final FINAL”, and “please work”. Restored into muscle memory only.',
  },
  {
    name: 'untitled_portfolio_v3.html',
    detail: 'An older draft that tried way too hard. Soft-deleted with love.',
  },
  {
    name: 'overthinking.log',
    detail: '1,204 lines of “what if they don’t like the pink taskbar”. Cleared. Mostly.',
  },
]

const FLOPPY_ITEMS = [
  {
    name: 'AUTOEXEC.BAT',
    detail: 'PATH=C:\\MADIHA;C:\\COFFEE;C:\\PIXELS',
  },
  {
    name: 'README.TXT',
    detail: 'Hi from A:\\ — a tiny drive full of early web dreams, sticker sheets, and unfinished doodles.',
  },
  {
    name: 'SECRET.PIN',
    detail: 'Favorite debugging snack: iced matcha + one more deploy.',
  },
  {
    name: 'SKETCH.BMP',
    detail: 'First homepage wireframe. Very serious boxes. Extremely 2019 energy.',
  },
]

const CD_ITEMS = [
  {
    name: '01 Opening Theme.mp3',
    detail: 'Soft boot chime energy. Perfect for turning the computer on.',
  },
  {
    name: '02 Hackathon Night.wav',
    detail: 'Late commits, brighter ideas, and at least one surprise demo win.',
  },
  {
    name: '03 Pixel Meadow.mid',
    detail: 'A little soundtrack for cloudy hills and pink Start menus.',
  },
  {
    name: 'TRACKLIST.TXT',
    detail: 'Madiha OS Soundtrack — burned lovingly onto D:\\ for local listening only.',
  },
]

function DriveExplorer({ heading, items, emptyLabel }) {
  const [selected, setSelected] = useState(items[0]?.name ?? null)
  const active = items.find(item => item.name === selected) || items[0]

  if (!items.length) {
    return (
      <article className="doc drive-empty">
        <h3>{heading}</h3>
        <p>{emptyLabel}</p>
      </article>
    )
  }

  return (
    <div className="explorer drive-explorer">
      <div className="explorer-side">
        <p className="drive-heading">{heading}</p>
        <ul className="file-list">
          {items.map(item => (
            <li key={item.name}>
              <button
                type="button"
                className={active?.name === item.name ? 'is-selected' : ''}
                onClick={() => setSelected(item.name)}
              >
                <span className="mini-file" aria-hidden="true" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {active && (
        <article className="explorer-detail">
          <h3>{active.name}</h3>
          <p>{active.detail}</p>
        </article>
      )}
    </div>
  )
}

function RecycleDoc() {
  return (
    <DriveExplorer
      heading="Recycle Bin"
      items={RECYCLE_ITEMS}
      emptyLabel="Recycle Bin is empty."
    />
  )
}

function FloppyDoc() {
  return <DriveExplorer heading="A:\\ — 3½ Floppy" items={FLOPPY_ITEMS} />
}

function CdDoc() {
  return <DriveExplorer heading="D:\\ — CD-ROM" items={CD_ITEMS} />
}

const CONTENT = {
  home: HomeDoc,
  projects: ProjectsDoc,
  education: EducationDoc,
  skills: SkillsDoc,
  resume: ResumeDoc,
  recycle: RecycleDoc,
  floppy: FloppyDoc,
  cd: CdDoc,
}

export default function WindowContent({ id, accent }) {
  const View = CONTENT[id]
  if (!View) return null
  return <View accent={accent} />
}
