import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

export default function PetModal({ pet, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [requestSent, setRequestSent] = useState(false)

  useEffect(() => {
    const previousFocus = document.activeElement
    document.body.classList.add('modal-open')
    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
      previousFocus?.focus()
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article ref={dialogRef} className="pet-modal" role="dialog" aria-modal="true" aria-labelledby="pet-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeRef} className="modal-close" type="button" aria-label="Close pet details" onClick={onClose}><Icon name="close" /></button>
        <div className="modal-image">
          <img src={pet.image} alt={`${pet.name}, a ${pet.breed}`} style={{ objectPosition: pet.imagePosition }} />
          {pet.score !== null && pet.score !== undefined && <span>{pet.score}% compatible</span>}
        </div>
        <div className="modal-content">
          <div className="eyebrow">Meet your potential companion</div>
          <h2 id="pet-modal-title">{pet.name}</h2>
          <p className="modal-meta">{pet.breed} | {pet.age} | {pet.gender}</p>
          <p className="modal-description">{pet.description}</p>
          <div className="modal-traits">{pet.traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
          {pet.explanation && (
            <div className="explanation-box">
              <strong><Icon name="sparkle" size={17} /> Why this match works</strong>
              <ul>{pet.explanation.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
              <p><strong>Keep in mind:</strong> {pet.explanation.consideration}</p>
            </div>
          )}
          {!requestSent ? (
            <>
              <button className="primary-button wide" type="button" onClick={() => setRequestSent(true)}>
                Request a meet-and-greet <Icon name="arrow" size={19} />
              </button>
              <small className="demo-note">This portfolio demo keeps the request private.</small>
            </>
          ) : (
            <div className="request-success" role="status">
              <span className="success-burst"><Icon name="check" size={24} /></span>
              <div><strong>You&apos;re one step closer to meeting {pet.name}!</strong><p>In a production app, the shelter would now receive your request and follow up by email.</p></div>
              <i className="confetti one"></i><i className="confetti two"></i><i className="confetti three"></i>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}


