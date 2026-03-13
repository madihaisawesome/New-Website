import { FiDownload, FiCalendar, FiBriefcase } from 'react-icons/fi'
import './Resume.css'

const experience = [
  {
    role: 'Software Engineer Intern',
    company: 'Professional Experience',
    location: 'Calgary, Canada',
    period: 'December 2025 — Present',
    bullets: [
      'Used Docker and Kubernetes to containerize applications.',
      'Developed RESTful APIs with Node.js and Express.',
    ],
  },
  {
    role: 'Lead Volunteer (Womens Side)',
    company: 'Community Leadership',
    location: 'Calgary, Canada',
    period: 'March 2024 — Present',
    bullets: [
      'Coordinated volunteer activities and managed schedules for a team of 15 volunteers.',
      'Led initiatives to improve community engagement and support services.',
    ],
  },
  {
    role: 'Casual Lunch Supervisor',
    company: 'School Support',
    location: 'Calgary, Canada',
    period: 'May 2023 — August 2025',
    bullets: [
      'Monitored and ensured the safety of students during lunch periods.',
      'Fostered a positive and inclusive environment by encouraging respectful interactions among students.',
    ],
  },
  {
    role: 'Lead Teacher',
    company: 'Education',
    location: 'Calgary, Canada',
    period: 'May 2023 — July 2023',
    bullets: [
      'Organized lesson plans and adapted content based on student progress for a class of 20.',
      'Collaborated with parents and peers to align on educational goals and outcomes.',
    ],
  },
  {
    role: 'YMCA Volunteer',
    company: 'YMCA',
    location: 'Calgary, Canada',
    period: 'March 2023 — June 2023',
    bullets: [
      'Assisted in activity planning and supervision for children.',
      'Supported staff in creating a safe and enjoyable environment for all participants.',
    ],
  },
  {
    role: 'Volunteer Education Assistant',
    company: 'Education Support',
    location: 'Calgary, Canada',
    period: 'July 2018 — August 2018',
    bullets: [
      'Helped design and implement educational activities for children.',
      'Provided one-on-one support to students needing extra assistance with learning tasks.',
    ],
  },
]

export default function Resume() {
  return (
    <section className="section resume-section" id="resume">
      <div className="container">
        <h2 className="section-title">Work <span>Experience</span></h2>
        <div className="divider" />
        <p className="section-subtitle">Experience timeline from my existing portfolio</p>

        <div className="timeline">
          {experience.map((item, idx) => (
            <div key={item.role} className="timeline-item">
              <div className="timeline-dot" />
              {idx < experience.length - 1 && <div className="timeline-line" />}
              <div className="timeline-content">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{item.role}</h3>
                    <p className="exp-company">
                      <FiBriefcase size={13} /> {item.company} · {item.location}
                    </p>
                  </div>
                  <span className="exp-period">
                    <FiCalendar size={13} /> {item.period}
                  </span>
                </div>
                <ul className="exp-bullets">
                  {item.bullets.map(b => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="resume-download">
          <a href="https://madihasportfolio.vercel.app/Resume.pdf" target="_blank" rel="noopener noreferrer" className="accent-btn">
            <FiDownload size={17} /> Download Full Resume
          </a>
        </div>
      </div>
    </section>
  )
}
