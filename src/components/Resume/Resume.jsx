import {
  FiDownload,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiGlobe,
  FiMapPin,
  FiCalendar,
  FiBriefcase,
  FiUsers,
} from 'react-icons/fi'
import './Resume.css'

const contactLinks = [
  { icon: FiMail, label: 'madiha.khan@ucalgary.ca', href: 'mailto:madiha.khan@ucalgary.ca' },
  { icon: FiPhone, label: '(825) 431-9445', href: 'tel:+18254319445' },
  { icon: FiLinkedin, label: 'linkedin.com/in/madiha-khan-19885a219', href: 'https://linkedin.com/in/madiha-khan-19885a219/' },
  { icon: FiGithub, label: 'github.com/madihaisawesome', href: 'https://github.com/madihaisawesome' },
  { icon: FiGlobe, label: 'madihasportfolio.vercel.app', href: 'https://madihasportfolio.vercel.app/' },
]

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

        <div className="resume-hero-card">
          <div className="resume-hero-copy">
            <p className="resume-kicker">Madiha Khan</p>
            <h3 className="resume-headline">Software Engineering student at the University of Calgary</h3>
            <p className="resume-summary">
              I build web and embedded systems with React, Flask, Java, Python, Docker, and Kubernetes.
              I enjoy turning ideas into reliable, user-focused software.
            </p>
            <div className="resume-location">
              <FiMapPin size={16} /> Calgary, Canada
            </div>
          </div>

          <div className="resume-contact-list">
            {contactLinks.map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="resume-contact-item">
                <span className="resume-contact-icon"><item.icon size={16} /></span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

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
