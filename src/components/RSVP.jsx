import { useState } from 'react'

// TODO: Replace these with your actual Google Form details (See Walkthrough for instructions)
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdzfnC_fuoHZUUXfh2TBX3TGDdSHrqndgZcEtns9gC8xqTIew/formResponse"
const ENTRY_ID_NAME = "entry.1963231352"        // Guest Name entry ID
const ENTRY_ID_ATTENDING = "entry.216223904"   // Attending status entry ID
const ENTRY_ID_GUESTS = "entry.1787361715"      // Guest Count entry ID
const ENTRY_ID_MESSAGE = "entry.261169458"     // Message entry ID

export default function RSVP({ guestName }) {
  const [attending, setAttending] = useState(null)
  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (attending === null) return

    setIsSubmitting(true)

    // Prepare form data using URLSearchParams for application/x-www-form-urlencoded
    const formData = new URLSearchParams()
    formData.append(ENTRY_ID_NAME, guestName || 'Anonymous')
    formData.append(ENTRY_ID_ATTENDING, attending ? "Yes, I will be there" : "No, I won't be able to attend")

    // Only send guest count if attending
    if (attending) {
      formData.append(ENTRY_ID_GUESTS, guests.toString())
    } else {
      formData.append(ENTRY_ID_GUESTS, "0")
    }

    if (message.trim()) {
      formData.append(ENTRY_ID_MESSAGE, message)
    }

    try {
      // Submit the form using no-cors mode to bypass CORS restrictions
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      })
      // Since mode is no-cors, we won't be able to see the response.
      // We'll assume success if no error was thrown.
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      alert("There was an issue submitting your RSVP. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
                  className={`flex-1 py-4 px-6 rounded-full border-2 transition-all font-sans tracking-wide font-semibold ${attending === true
                    ? 'bg-primary border-primary text-white shadow-lg scale-105'
                    : 'border-gray-200 text-gray-500 hover:border-primary/50'
                    }`}
                >
                  JOYFULLY ACCEPT
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 py-4 px-6 rounded-full border-2 transition-all font-sans tracking-wide font-semibold ${attending === false
                    ? 'bg-secondary border-secondary text-white shadow-lg scale-105'
                    : 'border-gray-200 text-gray-500 hover:border-secondary/50'
                    }`}
                >
                  REGRETFULLY DECLINE
                </button>
              </div>

              {/* Guest Counter - Only visible if attending is true */}
              <div className={`transition-all duration-500 overflow-hidden ${attending === true ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
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

              {/* Optional Message - Visible once a choice is made */}
              <div className={`transition-all duration-500 overflow-hidden ${attending !== null ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="block text-sm text-gray-600 font-sans mb-4 uppercase tracking-wider text-left">Message to the Couple (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a sweet note or any dietary restrictions..."
                  className="w-full border border-gray-300 rounded-xl p-4 font-sans focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none h-32"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={attending === null || isSubmitting}
                className="w-full bg-secondary text-white rounded-full py-4 font-sans font-bold tracking-widest text-sm hover:bg-opacity-90 transition-all border border-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    SENDING...
                  </>
                ) : 'SEND RSVP'}
              </button>
            </form>
          </>
        ) : (
          <div className="py-12 relative z-10 animate-fade-in">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif text-primary mb-4">
              {attending ? "We can't wait to see you!" : "You will be missed!"}
            </h2>
            <p className="text-gray-600 font-sans">
              Thank you for letting us know, {guestName || 'friend'}.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
