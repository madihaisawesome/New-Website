import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi'
import './Education.css'

const education = [
  {
    degree: 'Bachelor of Software Engineering',
    institution: 'University of Calgary',
    location: 'Calgary, Canada',
    period: '2023 — 2027',
    highlights: [
      'Currently completing third year in Software Engineering.',
      'Focused on problem-solving, software design, and practical application development.',
    ],
  },
]

export default function Education() {
  return (
    <section className="section edu-section" id="education">
      <div className="container">
        <h2 className="section-title"><span>Education</span> &amp; Certifications</h2>
        <div className="divider" />
        <p className="section-subtitle">Academic background and certifications</p>

        {/* Degree cards */}
        <div className="edu-list">
          {education.map(item => (
            <div key={item.degree} className="edu-card">
              <div className="edu-header">
                <div className="edu-degree-wrap">
                  <h3 className="edu-degree">{item.degree}</h3>
                  <p className="edu-institution">{item.institution}</p>
                </div>
                <div className="edu-meta">
                  <span className="edu-meta-item">
                    <FiMapPin size={13} /> {item.location}
                  </span>
                  <span className="edu-meta-item">
                    <FiCalendar size={13} /> {item.period}
                  </span>
                  {item.gpa && <span className="gpa-badge">GPA {item.gpa}</span>}
                </div>
              </div>
              <ul className="edu-highlights">
                {item.highlights.map(h => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
