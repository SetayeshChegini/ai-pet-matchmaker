import Icon from './Icon'
import { buildExplanation } from '../lib/scorer'

export default function PetCard({ pet, score, rank, answers, onOpen }) {
  const explanation = answers ? buildExplanation(pet, answers) : null

  return (
    <article className={`pet-card ${rank === 1 ? 'top-match' : ''}`}>
      <div className="pet-photo-wrap">
        <img src={pet.image} alt={`${pet.name}, a ${pet.breed}`} className="pet-photo" />
        {rank === 1 && <span className="best-match"><Icon name="sparkle" size={15} /> Best match</span>}
        {rank > 1 && <span className="rank-badge">#{rank}</span>}
        {score !== undefined && <span className="match-score">{score}% match</span>}
      </div>
      <div className="pet-card-body">
        <div className="pet-heading">
          <div>
            <h3>{pet.name}</h3>
            <p>{pet.breed} | {pet.age}</p>
          </div>
          <span className="pet-gender" aria-label={pet.gender}>{pet.gender === 'Female' ? '\u2640' : '\u2642'}</span>
        </div>
        <div className="pet-location"><Icon name="location" size={16} /> {pet.location}</div>
        <div className="trait-list">
          {pet.traits.map((trait) => <span key={trait}>{trait}</span>)}
        </div>
        {explanation && (
          <div className="match-note">
            <strong>Why you match</strong>
            <p>{explanation.reasons[1]}. {explanation.reasons[2]}.</p>
          </div>
        )}
        <button className="text-button" type="button" onClick={() => onOpen(pet, score, explanation)}>
          Meet {pet.name} <Icon name="arrow" size={18} />
        </button>
      </div>
    </article>
  )
}

