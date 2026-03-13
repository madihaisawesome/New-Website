import './Skills.css'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'SQL', 'HTML', 'CSS'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Vite', 'Tailwind CSS', 'Responsive Design', 'UI/UX Fundamentals'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Database Design'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
  },
  {
    category: 'DevOps & Tools',
    skills: ['Git', 'GitHub', 'Docker', 'Kubernetes', 'Postman', 'VS Code'],
  },
  {
    category: 'Other',
    skills: ['Game Development', 'Embedded Systems', 'Problem Solving', 'Debugging', 'Agile Collaboration'],
  },
]

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title">Technical <span>Skills</span></h2>
        <div className="divider" />
        <p className="section-subtitle">Core skills and technologies I work with</p>

        {/* Tag cloud grouped by category */}
        <div className="skills-groups">
          {skillGroups.map(group => (
            <div key={group.category} className="skill-group">
              <h3 className="skill-group-title">{group.category}</h3>
              <div className="skill-tags">
                {group.skills.map(skill => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
