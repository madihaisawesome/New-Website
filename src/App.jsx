import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Projects from './components/Projects/Projects'
import Education from './components/Education/Education'
import Skills from './components/Skills/Skills'
import Resume from './components/Resume/Resume'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import PixelBuddy from './components/PixelBuddy/PixelBuddy'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        {/* Floating decorative elements - mixed hearts and stars on both sides */}
        <div className="floating-decor floating-heart-sm" style={{ left: '4%', top: '8%', animationDelay: '0s' }} />
        <div className="floating-decor floating-star-lg" style={{ right: '6%', top: '12%', animationDelay: '0.5s' }} />
        <div className="floating-decor floating-star-md" style={{ left: '7%', top: '22%', animationDelay: '1.2s' }} />
        <div className="floating-decor floating-heart-lg" style={{ right: '5%', top: '28%', animationDelay: '0.3s' }} />
        <div className="floating-decor floating-star-sm" style={{ left: '5%', top: '38%', animationDelay: '1.8s' }} />
        <div className="floating-decor floating-heart-md" style={{ right: '7%', top: '44%', animationDelay: '0.8s' }} />
        <div className="floating-decor floating-heart-lg" style={{ left: '6%', top: '54%', animationDelay: '1.4s' }} />
        <div className="floating-decor floating-star-sm" style={{ right: '4%', top: '60%', animationDelay: '2s' }} />
        <div className="floating-decor floating-star-md" style={{ left: '5%', top: '70%', animationDelay: '0.6s' }} />
        <div className="floating-decor floating-heart-lg" style={{ right: '6%', top: '78%', animationDelay: '1.1s' }} />
        <div className="floating-decor floating-heart-sm" style={{ left: '7%', top: '86%', animationDelay: '2.2s' }} />
        <div className="floating-decor floating-star-lg" style={{ right: '5%', top: '92%', animationDelay: '0.7s' }} />
        
        <Navbar />
        <PixelBuddy />
        <main>
          <Hero />
          <Projects />
          <Education />
          <Skills />
          <Resume />
          {/* <Contact /> */}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
