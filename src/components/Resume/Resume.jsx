import {
  FiDownload,
  FiBriefcase,
  FiCalendar,
  FiUsers,
} from 'react-icons/fi'
import './Resume.css'

const experience = [
  {
    role: 'Software Engineering Internship',
    organization: 'Chorate AI · Remote',
    period: 'December 2025 — March 2026',
    bullets: [
      'Assisted in tasks and projects assigned by supervisors at Chorate AI.',
      'Engineered real-time system monitoring dashboards by integrating OS-level metrics with a web frontend.',
    ],
  },
  {
    role: 'Casual Lunch Supervisor',
    organization: 'Calgary Board of Education · Calgary, Alberta',
    period: 'May 2023 — August 2025',
    bullets: [
      'Monitored safety protocols and managed group dynamics in a fast-paced environment.',
      'Communicated effectively with team members to ensure smooth daily operations.',
    ],
  },
]

const leadership = [
  {
    role: 'Executive',
    organization: 'Knowledge Bridge Engineering Club',
    period: 'May 2026 — Present',
    bullets: [
      'Sustained educational research between course lectures/lab content and real-world industry needs.',
      'Helped bridge the gap between student expectations and course learning outcomes.',
    ],
  },
  {
    role: 'VP of External Affairs',
    organization: 'MISS UCalgary Club',
    period: 'May 2024 — December 2025',
    bullets: [
      'Collaborated with sponsors and cross-functional teams to secure funding and plan events.',
      'Demonstrated strong remote coordination and communication skills in a hybrid setting.',
    ],
  },
]

export default function Resume() {
  return (
    <section className="section resume-section" id="resume">
      <div className="container">
        <h2 className="section-title">Resume <span>Snapshot</span></h2>
        <div className="divider" />
        <p className="section-subtitle">Work experience and leadership highlights</p>

        <div className="resume-grid">
          <article className="resume-card resume-card-wide">
            <div className="resume-card-header">
              <FiBriefcase size={18} />
              <h3>Work Experience</h3>
            </div>
            <div className="resume-item-list">
              {experience.map(item => (
                <div key={item.role} className="resume-item">
                  <div className="resume-item-top">
                    <div>
                      <h4 className="resume-item-title">{item.role}</h4>
                      <p className="resume-item-org">{item.organization}</p>
                    </div>
                    <span className="resume-item-period">
                      <FiCalendar size={13} /> {item.period}
                    </span>
                  </div>
                  <ul className="resume-item-bullets">
                    {item.bullets.map(detail => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="resume-card resume-card-wide">
            <div className="resume-card-header">
              <FiUsers size={18} />
              <h3>Leadership</h3>
            </div>
            <div className="resume-item-list">
              {leadership.map(item => (
                <div key={item.role} className="resume-item">
                  <div className="resume-item-top">
                    <div>
                      <h4 className="resume-item-title">{item.role}</h4>
                      <p className="resume-item-org">{item.organization}</p>
                    </div>
                    <span className="resume-item-period">
                      <FiCalendar size={13} /> {item.period}
                    </span>
                  </div>
                  <ul className="resume-item-bullets">
                    {item.bullets.map(detail => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="resume-download">
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="accent-btn">
            <FiDownload size={17} /> Download Full Resume
          </a>
        </div>
      </div>
    </section>
  )
}
