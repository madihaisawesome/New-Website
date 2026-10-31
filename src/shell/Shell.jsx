import { useState } from 'react'
import App from '../App.jsx'
import Room from './Room.jsx'
import Desktop from './Desktop.jsx'

export default function Shell() {
  const [view, setView] = useState('room')

  if (view === 'site') {
    return <App onBackToDesktop={() => setView('desktop')} />
  }

  if (view === 'desktop') {
    return (
      <Desktop
        onExplore={() => setView('site')}
        onShutdown={() => setView('room')}
      />
    )
  }

  return <Room onBoot={() => setView('desktop')} />
}
