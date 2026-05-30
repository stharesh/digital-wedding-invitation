import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Popup from './components/Popup'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import MediaVenue from './components/MediaVenue'
import RSVP from './components/RSVP'

function App() {
  const [guestName, setGuestName] = useState('')
  const [hasEntered, setHasEntered] = useState(false)

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <Popup 
        guestName={guestName} 
        setGuestName={setGuestName} 
        hasEntered={hasEntered} 
        setHasEntered={setHasEntered} 
      />

      {/* Main Content */}
      <main className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Hero guestName={guestName} />
        <Timeline />
        <MediaVenue />
        <RSVP guestName={guestName} />
      </main>
    </div>
  )
}

export default App
