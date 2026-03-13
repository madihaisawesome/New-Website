import { useState } from 'react'
import { FiMail, FiLinkedin, FiGithub, FiSend, FiCheck } from 'react-icons/fi'
import './Contact.css'

const contactLinks = [
  { icon: FiMail, label: 'm24049502@gmail.com', href: 'mailto:m24049502@gmail.com' },
  { icon: FiLinkedin, label: 'linkedin.com/in/madiha-khan-19885a219', href: 'https://linkedin.com/in/madiha-khan-19885a219/' },
  { icon: FiGithub, label: 'github.com/madihaisawesome', href: 'https://github.com/madihaisawesome' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    // Simulate send
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 1200)
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">Get In <span>Touch</span></h2>
        <div className="divider" />
        <p className="section-subtitle">
          Based in Calgary, Canada. Whether you have a question, an idea, or
          just want to say hi — my inbox is always open.
        </p>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <p className="contact-intro">
              Reach out through email, LinkedIn, or GitHub. I would love to connect and collaborate.
            </p>
            <div className="contact-links">
              {contactLinks.map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                  <span className="contact-link-icon"><item.icon size={18} /></span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project or just say hello…"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="accent-btn send-btn" disabled={loading || sent}>
              {sent ? <><FiCheck size={16} /> Sent!</> : loading ? 'Sending…' : <><FiSend size={16} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
