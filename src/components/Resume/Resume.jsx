import {
  FiDownload,
  FiBriefcase,
  FiCalendar,
  FiUsers,
  FiBookOpen,
} from 'react-icons/fi'
import './Resume.css'

const experience = [
  {
    role: 'Software Engineering Internship',
    organization: 'Chorate AI · Remote',
    period: 'December 2025 — March 2026',
    bullets: [
      'Supported software engineering tasks and feature development under the guidance of senior team members.',
      'Built and refined real-time monitoring dashboards by connecting OS-level system metrics to a responsive web frontend.',
      'Collaborated on troubleshooting and iterative improvements to enhance usability, reliability, and performance.',
    ],
  },
  {
    role: 'Sales Associate / Customer Service',
    organization: 'Party Central · Calgary, Alberta',
    period: 'March 2023 — August 2026',
    bullets: [
      'Assisted with daily store operations, including stocking shelves, maintaining organized inventory, and supporting inventory control.',
      'Counted and monitored inventory to help ensure accurate stock levels and organized product storage.',
      'Provided friendly customer service during checkout, operated the register, and handled cash accurately while helping customers locate products.',
      'Maintained a clean and organized store by sweeping, mopping, and completing general cleaning duties.',
    ],
  },
  {
    role: 'Supervisor',
    organization: 'Calgary Board of Education · Calgary, Alberta',
    period: 'May 2023 — August 2025',
    bullets: [
      'Assisted the management team in overseeing daily facility operations in a fast-paced, high-volume environment.',
      'Ensured health, safety, and cleanliness standards were maintained and consistently complied with across all supervised areas.',
      'Resolved daily operational issues promptly while delivering excellent customer service and engaging positively with staff, students, and parents.',
      'Completed manager-on-duty responsibilities, including following up on assigned duties, enforcing policies, and maintaining accurate time and attendance records.',
    ],
  },
  {
    role: 'Lead Teacher',
    organization: 'South Calgary Ilm and Tarbiya Centre · Calgary, Alberta',
    period: 'May 2024 — August 2024',
    bullets: [
      'Managed physical logistics and receiving, including unboxing daily shipments and accurately stocking supplies on shelves.',
      'Maintained a neat and highly organized environment by managing inventory and daily resources with strong attention to detail.',
      'Prioritized immediate needs and worked independently to ensure all daily operations and schedules were executed safely and on time.',
      'Maintained detailed records for performance management and progress tracking for 20 students.',
    ],
  },
  {
    role: 'Tutor',
    organization: 'Tutor Doctor · Calgary, Alberta',
    period: 'February 2023 — July 2023',
    bullets: [
      'Worked independently to provide customer-service-oriented support tailored to student needs.',
      'Collaborated directly with parents and students to ensure satisfaction and clear communication regarding course materials and progress.',
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

const education = {
  degree: 'Bachelor of Software Engineering',
  institution: 'University of Calgary · Calgary, Canada',
  period: '2023 — 2027',
  highlights: [
    'Currently completing third year in Software Engineering.',
    'Focused on problem-solving, software design, and practical application development.',
  ],
}

export default function Resume() {
  return (
    <section className="section resume-section" id="resume">
      <div className="container">
        <h2 className="section-title">Resume <span>Snapshot</span></h2>
        <div className="divider" />
        <p className="section-subtitle">Education, work experience, and leadership highlights</p>

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

          <article className="resume-card resume-card-wide">
            <div className="resume-card-header">
              <FiBookOpen size={18} />
              <h3>Education</h3>
            </div>
            <div className="resume-item-list">
              <div className="resume-item">
                <div className="resume-item-top">
                  <div>
                    <h4 className="resume-item-title">{education.degree}</h4>
                    <p className="resume-item-org">{education.institution}</p>
                  </div>
                  <span className="resume-item-period">
                    <FiCalendar size={13} /> {education.period}
                  </span>
                </div>
                <ul className="resume-item-bullets">
                  {education.highlights.map(detail => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
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
