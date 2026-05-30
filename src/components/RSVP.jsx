import { useState } from 'react'

export default function RSVP({ guestName }) {
  const [attending, setAttending] = useState(null)
  const [guests, setGuests] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (attending === null) return
    setSubmitted(true)
  }

  return (
    <section className="py-32 bg-bg-page flex items-center justify-center px-4">
      <div className="bg-white max-w-2xl w-full p-10 md:p-16 rounded-3xl shadow-2xl text-center border-t-8 border-primary relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-tr-full pointer-events-none"></div>

        {!submitted ? (
          <>
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
              {guestName ? `${guestName}, will you be joining us?` : 'Will you be joining us?'}
            </h2>
            <p className="text-gray-600 font-sans mb-12">
              Please let us know if you can make it to our special day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              {/* Toggle */}
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button 
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`flex-1 py-4 px-6 rounded-full border-2 transition-all font-sans tracking-wide font-semibold ${
                    attending === true 
                      ? 'bg-primary border-primary text-white shadow-lg scale-105' 
                      : 'border-gray-200 text-gray-500 hover:border-primary/50'
                  }`}
                >
                  JOYFULLY ACCEPT
                </button>
                <button 
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 py-4 px-6 rounded-full border-2 transition-all font-sans tracking-wide font-semibold ${
                    attending === false 
                      ? 'bg-secondary border-secondary text-white shadow-lg scale-105' 
                      : 'border-gray-200 text-gray-500 hover:border-secondary/50'
                  }`}
                >
                  REGRETFULLY DECLINE
                </button>
              </div>

              {/* Guest Counter */}
              <div className={`transition-all duration-500 overflow-hidden ${attending ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="block text-sm text-gray-600 font-sans mb-4 uppercase tracking-wider">Number of Guests (including you)</label>
                <div className="flex items-center justify-center gap-6">
                  <button 
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-serif text-3xl text-secondary w-8">{guests}</span>
                  <button 
                    type="button"
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="w-12 h-12 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={attending === null}
                className="w-full bg-secondary text-white rounded-full py-4 font-sans font-bold tracking-widest text-sm hover:bg-opacity-90 transition-all border border-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                SEND RSVP
              </button>
            </form>
          </>
        ) : (
          <div className="py-12 relative z-10 animate-fade-in">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h2 className="text-3xl font-serif text-primary mb-4">
              {attending ? "We can't wait to see you!" : "You will be missed!"}
            </h2>
            <p className="text-gray-600 font-sans">
              Thank you for letting us know, {guestName}.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
