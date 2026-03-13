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
        <Navbar />
        <PixelBuddy />
        <main>
          <Hero />
          <Projects />
          <Education />
          <Skills />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
