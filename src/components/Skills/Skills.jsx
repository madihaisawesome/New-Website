import './Skills.css'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    category: 'Web Tech',
    skills: ['React.js', 'Next.js', 'Node.js', 'Flask', 'REST APIs', 'Responsive Design'],
  },
  {
    category: 'Tools & Environments',
    skills: ['Git', 'GitHub', 'Visual Studio', 'Linux/Unix Shell', 'Docker', 'Kubernetes'],
  },
  {
    category: 'Data & Databases',
    skills: ['MySQL', 'SQL', 'Database Design', 'Microsoft Office Suite', 'MATLAB'],
  },
  {
    category: 'Concepts',
    skills: ['Object-Oriented Programming', 'Data Structures & Algorithms', 'Debugging', 'Performance Optimization'],
  },
  {
    category: 'Strengths',
    skills: ['Workflow Automation', 'Project Ownership', 'Communication', 'Leadership', 'Adaptability'],
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
