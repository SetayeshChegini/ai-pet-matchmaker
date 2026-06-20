import { useMemo, useState } from 'react'
import './App.css'

const questions = [
  {
    id: 'home',
    eyebrow: 'Your space',
    question: 'What does home look like for you?',
    helper: 'Space matters, but temperament and daily enrichment matter just as much.',
    options: [
      { value: 'apartment', label: 'Apartment', detail: 'Compact space, no private yard', icon: 'building' },
      { value: 'small-house', label: 'House or townhouse', detail: 'Some extra room, maybe a small yard', icon: 'home' },
      { value: 'large-house', label: 'Larger home', detail: 'Plenty of room and outdoor access', icon: 'trees' },
    ],
  },
  {
    id: 'schedule',
    eyebrow: 'Your routine',
    question: 'How long is your pet usually home alone?',
    helper: 'We use this to find a companion whose independence fits your schedule.',
    options: [
      { value: 'low', label: 'Less than 4 hours', detail: 'I am home often or have flexible support', icon: 'sun' },
      { value: 'medium', label: '4â€“8 hours', detail: 'A typical workday with time before and after', icon: 'clock' },
      { value: 'high', label: 'More than 8 hours', detail: 'I need a more independent companion', icon: 'moon' },
    ],
  },
  {
    id: 'activity',
    eyebrow: 'Your pace',
    question: 'What is your ideal activity level?',
    helper: 'A good energy match makes everyday life happier for both of you.',
    options: [
      { value: 'calm', label: 'Cozy and calm', detail: 'Quiet evenings and gentle daily activity', icon: 'coffee' },
      { value: 'balanced', label: 'A balanced mix', detail: 'Walks and play, with plenty of downtime', icon: 'balance' },
      { value: 'active', label: 'Always moving', detail: 'Hikes, runs, training and outdoor adventures', icon: 'bolt' },
    ],
  },
  {
    id: 'experience',
    eyebrow: 'Your experience',
    question: 'How familiar are you with pet care?',
    helper: 'There is a wonderful match for every experience level.',
    options: [
      { value: 'first', label: 'First-time adopter', detail: 'I would appreciate an easier-going match', icon: 'sparkle' },
      { value: 'some', label: 'Some experience', detail: 'I have lived with or cared for pets before', icon: 'heart' },
      { value: 'experienced', label: 'Very experienced', detail: 'I am comfortable with training or special needs', icon: 'badge' },
    ],
  },
  {
    id: 'grooming',
    eyebrow: 'Care preferences',
    question: 'How much grooming works for your routine?',
    helper: 'Think about brushing, coat care and regular professional appointments.',
    options: [
      { value: 'low', label: 'Keep it simple', detail: 'Minimal coat care is best for me', icon: 'feather' },
      { value: 'medium', label: 'A weekly routine', detail: 'I can handle brushing and regular upkeep', icon: 'brush' },
      { value: 'high', label: 'Happy to maintain', detail: 'Frequent grooming and appointments are fine', icon: 'scissors' },
    ],
  },
  {
    id: 'allergies',
    eyebrow: 'Health and comfort',
    question: 'Does anyone at home have pet allergies?',
    helper: 'No pet is completely allergen-free, but some may be easier to live with.',
    options: [
      { value: 'yes', label: 'Yes, allergies matter', detail: 'Prioritize lower-shedding or lower-dander matches', icon: 'shield' },
      { value: 'no', label: 'No known allergies', detail: 'Coat type does not need special consideration', icon: 'check' },
    ],
  },
  {
    id: 'species',
    eyebrow: 'Your preference',
    question: 'Who are you hoping to meet?',
    helper: 'Stay open-minded and your best match might surprise you.',
    options: [
      { value: 'flexible', label: 'Surprise me', detail: 'Compatibility matters more than species', icon: 'stars' },
      { value: 'cat', label: 'A cat', detail: 'Independent charm and cozy companionship', icon: 'cat' },
      { value: 'dog', label: 'A dog', detail: 'Loyal company and an active bond', icon: 'dog' },
      { value: 'small', label: 'A small pet', detail: 'A compact companion with a big personality', icon: 'rabbit' },
    ],
  },
]

const pets = [
  {
    id: 1,
    name: 'Luna',
    species: 'cat',
    breed: 'Domestic shorthair',
    age: '4 years',
    gender: 'Female',
    location: '2.4 km away',
    energy: 'calm',
    homes: ['apartment', 'small-house', 'large-house'],
    independence: 'high',
    experience: 'first',
    grooming: 'low',
    allergyFriendly: false,
    traits: ['Gentle', 'Independent', 'Quiet home'],
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1000&q=85',
    description: 'Luna is a soft-hearted observer who loves sunny windows, slow blinks and curling up nearby while you work.',
  },
  {
    id: 2,
    name: 'Milo',
    species: 'dog',
    breed: 'Mini poodle mix',
    age: '3 years',
    gender: 'Male',
    location: '5.1 km away',
    energy: 'balanced',
    homes: ['apartment', 'small-house', 'large-house'],
    independence: 'medium',
    experience: 'first',
    grooming: 'high',
    allergyFriendly: true,
    traits: ['Affectionate', 'Smart', 'Lower shedding'],
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1000&q=85',
    description: 'Milo is a bright, affectionate companion who enjoys neighborhood walks, puzzle toys and being part of the family.',
  },
  {
    id: 3,
    name: 'Scout',
    species: 'dog',
    breed: 'Labrador mix',
    age: '2 years',
    gender: 'Male',
    location: '7.8 km away',
    energy: 'active',
    homes: ['small-house', 'large-house'],
    independence: 'low',
    experience: 'some',
    grooming: 'medium',
    allergyFriendly: false,
    traits: ['Playful', 'Social', 'Adventure-ready'],
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1000&q=85',
    description: 'Scout is a joyful adventure buddy who thrives on training games, long walks and plenty of time with his people.',
  },
  {
    id: 4,
    name: 'Poppy',
    species: 'small',
    breed: 'Mini lop rabbit',
    age: '2 years',
    gender: 'Female',
    location: '3.6 km away',
    energy: 'calm',
    homes: ['apartment', 'small-house', 'large-house'],
    independence: 'high',
    experience: 'first',
    grooming: 'medium',
    allergyFriendly: true,
    traits: ['Curious', 'Calm', 'Apartment-friendly'],
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1000&q=85',
    description: 'Poppy is a curious little companion who enjoys gentle enrichment, fresh greens and a peaceful indoor space.',
  },
  {
    id: 5,
    name: 'Theo',
    species: 'cat',
    breed: 'Tabby',
    age: '9 years',
    gender: 'Male',
    location: '6.2 km away',
    energy: 'calm',
    homes: ['apartment', 'small-house', 'large-house'],
    independence: 'high',
    experience: 'first',
    grooming: 'low',
    allergyFriendly: false,
    traits: ['Mellow', 'House-trained', 'Senior sweetheart'],
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1000&q=85',
    description: 'Theo is a mellow senior gentleman looking for a steady routine, a soft bed and someone to share quiet evenings with.',
  },
  {
    id: 6,
    name: 'Nala',
    species: 'dog',
    breed: 'Shepherd mix',
    age: '4 years',
    gender: 'Female',
    location: '9.3 km away',
    energy: 'active',
    homes: ['large-house'],
    independence: 'low',
    experience: 'experienced',
    grooming: 'medium',
    allergyFriendly: false,
    traits: ['Loyal', 'Trainable', 'Outdoor-loving'],
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85',
    description: 'Nala is a loyal, intelligent dog who will flourish with structure, continued training and room to explore.',
  },
]

const activityRank = { calm: 0, balanced: 1, active: 2 }
const groomingRank = { low: 0, medium: 1, high: 2 }
const experienceRank = { first: 0, some: 1, experienced: 2 }

function Icon({ name, size = 22 }) {
  const paths = {
    paw: <><circle cx="6.6" cy="8" r="2.2"/><circle cx="12" cy="5.5" r="2.2"/><circle cx="17.4" cy="8" r="2.2"/><path d="M12 10.2c-3.7 0-6.7 2.9-6.7 6.1 0 1.7 1.3 2.7 2.9 2.7 1.3 0 2.4-.7 3.8-.7s2.5.7 3.8.7c1.6 0 2.9-1 2.9-2.7 0-3.2-3-6.1-6.7-6.1Z"/></>,
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    sparkle: <><path d="m12 3 1.1 3.4a5 5 0 0 0 3.2 3.2L20 11l-3.7 1.3a5 5 0 0 0-3.2 3.2L12 19l-1.1-3.5a5 5 0 0 0-3.2-3.2L4 11l3.7-1.4a5 5 0 0 0 3.2-3.2L12 3Z"/></>,
    brain: <><path d="M9.5 4.5A3 3 0 0 0 5 7.1a3 3 0 0 0-.4 5.6A3.2 3.2 0 0 0 9.5 17"/><path d="M14.5 4.5A3 3 0 0 1 19 7.1a3 3 0 0 1 .4 5.6 3.2 3.2 0 0 1-4.9 4.3"/><path d="M9.5 4.5V19M14.5 4.5V19M7 9h2.5M14.5 9H17M7.5 14h2M14.5 14h2"/></>,
    shield: <><path d="M12 3 5 6v5c0 4.5 2.8 7.7 7 10 4.2-2.3 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    heart: <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 22l7.8-7.3 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
  }
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name] || paths.sparkle}
    </svg>
  )
}

function scorePet(pet, answers) {
  let score = 0

  score += pet.homes.includes(answers.home) ? 18 : answers.home === 'small-house' && pet.homes.includes('apartment') ? 12 : 4

  const scheduleFit = {
    low: { low: 20, medium: 18, high: 16 },
    medium: { low: 7, medium: 20, high: 18 },
    high: { low: 2, medium: 11, high: 20 },
  }
  score += scheduleFit[answers.schedule]?.[pet.independence] || 0

  const energyDifference = Math.abs(activityRank[answers.activity] - activityRank[pet.energy])
  score += energyDifference === 0 ? 18 : energyDifference === 1 ? 11 : 3

  const adopterExperience = experienceRank[answers.experience]
  const petExperience = experienceRank[pet.experience]
  score += adopterExperience >= petExperience ? 12 : adopterExperience + 1 === petExperience ? 7 : 2

  score += groomingRank[answers.grooming] >= groomingRank[pet.grooming] ? 10 : groomingRank[answers.grooming] + 1 === groomingRank[pet.grooming] ? 5 : 1
  score += answers.allergies === 'no' ? 12 : pet.allergyFriendly ? 12 : 2
  score += answers.species === 'flexible' || answers.species === pet.species ? 10 : 1

  return Math.min(99, Math.round(score))
}

function buildExplanation(pet, answers) {
  const homeReason = pet.homes.includes(answers.home)
    ? `${pet.name} is comfortable in your type of home`
    : `${pet.name} may need a little more space planning`
  const scheduleReason = answers.schedule === 'high' && pet.independence === 'high'
    ? `${pet.name}'s independent nature fits longer workdays`
    : answers.schedule === 'low' && pet.independence === 'low'
      ? `Your flexible schedule offers the companionship ${pet.name} enjoys`
      : `${pet.name}'s routine can work well with your daily availability`
  const energyReason = activityRank[answers.activity] === activityRank[pet.energy]
    ? `Your preferred activity level is an excellent match`
    : `A small adjustment in daily activity would keep you both fulfilled`

  let consideration = `${pet.name}'s ${pet.grooming} grooming needs fit within the care level you selected.`
  if (answers.allergies === 'yes' && !pet.allergyFriendly) {
    consideration = 'Allergies need an in-person trial and guidance from a medical professional before adopting.'
  } else if (groomingRank[answers.grooming] < groomingRank[pet.grooming]) {
    consideration = `${pet.name} needs more coat care than you preferred, so plan for professional grooming support.`
  } else if (experienceRank[answers.experience] < experienceRank[pet.experience]) {
    consideration = `${pet.name} will benefit from training support while you build confidence together.`
  }

  return { reasons: [homeReason, scheduleReason, energyReason], consideration }
}

function PetCard({ pet, score, rank, answers, onOpen }) {
  const explanation = answers ? buildExplanation(pet, answers) : null
  return (
    <article className={`pet-card ${rank === 1 ? 'top-match' : ''}`}>
      <div className="pet-photo-wrap">
        <img src={pet.image} alt={`${pet.name}, a ${pet.breed}`} className="pet-photo" />
        {rank === 1 && <span className="best-match"><Icon name="sparkle" size={15} /> Best match</span>}
        {score && <span className="match-score">{score}% match</span>}
      </div>
      <div className="pet-card-body">
        <div className="pet-heading">
          <div>
            <h3>{pet.name}</h3>
            <p>{pet.breed} Â· {pet.age}</p>
          </div>
          <span className="pet-gender" aria-label={pet.gender}>{pet.gender === 'Female' ? 'â™€' : 'â™‚'}</span>
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)

  const results = useMemo(() => pets
    .map((pet) => ({ ...pet, score: scorePet(pet, answers) }))
    .sort((a, b) => b.score - a.score), [answers])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const beginQuiz = () => {
    setQuizStarted(true)
    setShowResults(false)
    setCurrentQuestion(0)
    window.setTimeout(() => scrollTo('match-quiz'), 50)
  }

  const chooseOption = (value) => {
    const question = questions[currentQuestion]
    setAnswers((current) => ({ ...current, [question.id]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setShowResults(true)
      window.setTimeout(() => scrollTo('results'), 80)
      return
    }
    setCurrentQuestion((current) => current + 1)
  }

  const retakeQuiz = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setShowResults(false)
    setQuizStarted(true)
    scrollTo('match-quiz')
  }

  const openPet = (pet, score = null, explanation = null) => {
    setSelectedPet({ ...pet, score, explanation })
    document.body.classList.add('modal-open')
  }

  const closePet = () => {
    setSelectedPet(null)
    document.body.classList.remove('modal-open')
  }

  const question = questions[currentQuestion]
  const answerSelected = answers[question?.id]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="PawPair home">
          <span className="brand-mark"><Icon name="paw" size={22} /></span>
          <span>Paw<span>Pair</span></span>
        </a>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
          <button type="button" onClick={() => scrollTo('how-it-works')}>How it works</button>
          <button type="button" onClick={() => scrollTo('pets')}>Meet the pets</button>
          <button type="button" className="nav-cta" onClick={beginQuiz}>Find my match <Icon name="arrow" size={17} /></button>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><Icon name="sparkle" size={16} /> AI-powered compatibility</div>
            <h1>Meet the pet who <em>fits your life.</em></h1>
            <p className="hero-lead">A thoughtful match is about more than a cute face. Tell us about your routine, home and experienceâ€”we will find companions ready to thrive with you.</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={beginQuiz}>Start your match <Icon name="arrow" size={19} /></button>
              <button className="secondary-button" type="button" onClick={() => scrollTo('how-it-works')}>See how it works</button>
            </div>
            <div className="trust-row">
              <div className="avatar-stack" aria-hidden="true">
                {pets.slice(0, 3).map((pet) => <img key={pet.id} src={pet.image} alt="" />)}
              </div>
              <p><strong>1,200+ thoughtful matches</strong><br />Made with care, not guesswork</p>
            </div>
          </div>

          <div className="hero-visual" aria-label="Example pet match">
            <div className="hero-blob hero-blob-one"></div>
            <div className="hero-blob hero-blob-two"></div>
            <div className="hero-image-card">
              <img src={pets[1].image} alt="Milo, a mini poodle mix" />
              <div className="floating-pet-name">
                <span><strong>Milo</strong><small>Mini poodle mix Â· 3 years</small></span>
                <span className="heart-button"><Icon name="heart" size={19} /></span>
              </div>
            </div>
            <div className="floating-match-card">
              <span className="mini-score">94%</span>
              <span><strong>Great match</strong><small>Balanced energy Â· Apartment-friendly</small></span>
            </div>
            <div className="floating-ai-card"><Icon name="sparkle" size={18} /> Matched to your lifestyle</div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Platform highlights">
          <div><strong>7</strong><span>Lifestyle signals</span></div>
          <div><strong>100%</strong><span>Explainable matches</span></div>
          <div><strong>2 min</strong><span>To meet your match</span></div>
          <div><strong>Always</strong><span>Adoption-first</span></div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-heading centered">
            <div className="eyebrow">A better way to adopt</div>
            <h2>Compatibility first.<br /><em>Love follows.</em></h2>
            <p>Our explainable recommendation model looks at the parts of daily life that make a placement last.</p>
          </div>
          <div className="steps-grid">
            <article>
              <span className="step-number">01</span>
              <span className="step-icon peach"><Icon name="heart" /></span>
              <h3>Tell us about you</h3>
              <p>Share your home, routine, activity level and care preferences in a friendly two-minute quiz.</p>
            </article>
            <article>
              <span className="step-number">02</span>
              <span className="step-icon green"><Icon name="brain" /></span>
              <h3>We compare the fit</h3>
              <p>Our model weighs seven compatibility signals against each pet&apos;s real needs and temperament.</p>
            </article>
            <article>
              <span className="step-number">03</span>
              <span className="step-icon yellow"><Icon name="sparkle" /></span>
              <h3>Meet your matches</h3>
              <p>See your strongest matches, a clear explanation and anything important to consider before meeting.</p>
            </article>
          </div>
        </section>

        <section className="quiz-section" id="match-quiz">
          <div className="quiz-intro">
            <div className="eyebrow light"><Icon name="paw" size={16} /> Your compatibility profile</div>
            <h2>Let&apos;s find your <em>kind of companion.</em></h2>
            <p>No wrong answers. Honest routines create happier, longer-lasting matches.</p>
            <ul>
              <li><Icon name="check" size={17} /> Takes about two minutes</li>
              <li><Icon name="check" size={17} /> Transparent, explainable results</li>
              <li><Icon name="check" size={17} /> No account required</li>
            </ul>
          </div>

          <div className="quiz-card">
            {!quizStarted ? (
              <div className="quiz-welcome">
                <span className="welcome-icon"><Icon name="paw" size={30} /></span>
                <span className="question-count">7 thoughtful questions</span>
                <h3>Your best friend might already be waiting.</h3>
                <p>Build your lifestyle profile and meet the pets whose needs, temperament and energy fit naturally into your life.</p>
                <button className="primary-button wide" type="button" onClick={beginQuiz}>Build my profile <Icon name="arrow" size={19} /></button>
                <small><Icon name="shield" size={15} /> Your answers stay private in this demo</small>
              </div>
            ) : !showResults ? (
              <div className="question-panel" key={question.id}>
                <div className="quiz-progress-row">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100">
                  <span style={{ width: `${progress}%` }}></span>
                </div>
                <div className="question-copy">
                  <span>{question.eyebrow}</span>
                  <h3>{question.question}</h3>
                  <p>{question.helper}</p>
                </div>
                <div className={`options-grid ${question.options.length === 2 ? 'two-options' : ''}`}>
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={answerSelected === option.value ? 'option-card selected' : 'option-card'}
                      aria-pressed={answerSelected === option.value}
                      onClick={() => chooseOption(option.value)}
                    >
                      <span className="option-symbol">{option.icon.slice(0, 1).toUpperCase()}</span>
                      <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                      <span className="option-check"><Icon name="check" size={15} /></span>
                    </button>
                  ))}
                </div>
                <div className="quiz-controls">
                  <button type="button" className="back-button" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion((current) => current - 1)}>Back</button>
                  <button type="button" className="next-button" disabled={!answerSelected} onClick={nextQuestion}>
                    {currentQuestion === questions.length - 1 ? 'See my matches' : 'Continue'} <Icon name="arrow" size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="quiz-complete">
                <span className="welcome-icon"><Icon name="sparkle" size={30} /></span>
                <span className="question-count">Profile complete</span>
                <h3>We found {results.filter((pet) => pet.score >= 70).length} promising companions.</h3>
                <p>Your results balance lifestyle fit, care needs and temperament. Your strongest match is waiting below.</p>
                <button className="primary-button wide" type="button" onClick={() => scrollTo('results')}>View my matches <Icon name="arrow" size={19} /></button>
              </div>
            )}
          </div>
        </section>

        {showResults && (
          <section className="results-section" id="results">
            <div className="results-heading">
              <div>
                <div className="eyebrow"><Icon name="sparkle" size={16} /> Your personalized results</div>
                <h2>Your strongest <em>matches.</em></h2>
                <p>These pets align most closely with your lifestyle profile. Compatibility is a starting pointâ€”the real connection happens when you meet.</p>
              </div>
              <button className="retake-button" type="button" onClick={retakeQuiz}>Retake quiz</button>
            </div>
            <div className="match-summary">
              <div className="score-ring" style={{ '--score': `${results[0].score * 3.6}deg` }}><span>{results[0].score}<small>%</small></span></div>
              <div>
                <span>Top compatibility insight</span>
                <h3>{results[0].name} fits the rhythm of your everyday life.</h3>
                <p>{buildExplanation(results[0], answers).reasons.join('. ')}.</p>
              </div>
            </div>
            <div className="match-grid">
              {results.slice(0, 3).map((pet, index) => (
                <PetCard key={pet.id} pet={pet} score={pet.score} rank={index + 1} answers={answers} onOpen={openPet} />
              ))}
            </div>
            <div className="model-note">
              <Icon name="brain" size={22} />
              <p><strong>How your score works</strong> We compare home fit, schedule, energy, experience, grooming, allergies and species preference. No single answer decides a match.</p>
            </div>
          </section>
        )}

        <section className="pets-section" id="pets">
          <div className="section-heading split">
            <div>
              <div className="eyebrow">Ready to be discovered</div>
              <h2>Wonderful pets.<br /><em>Real personalities.</em></h2>
            </div>
            <p>Every profile includes care needs and temperamentâ€”not just a photoâ€”so you can imagine everyday life together.</p>
          </div>
          <div className="all-pets-grid">
            {pets.slice(0, 4).map((pet) => <PetCard key={pet.id} pet={pet} onOpen={openPet} />)}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-paws" aria-hidden="true"><Icon name="paw" size={92} /></div>
          <div className="eyebrow light">Your next chapter has paws</div>
          <h2>Ready to meet your match?</h2>
          <p>Seven questions can bring you one step closer to a companion who truly fits.</p>
          <button className="primary-button light-button" type="button" onClick={beginQuiz}>Find my pet <Icon name="arrow" size={19} /></button>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Icon name="paw" size={22} /></span><span>Paw<span>Pair</span></span></a>
        <p>Thoughtful technology for happier adoptions.</p>
        <span>Portfolio MVP Â· Explainable recommendation model</span>
      </footer>

      {selectedPet && (
        <div className="modal-backdrop" role="presentation" onMouseDown={closePet}>
          <article className="pet-modal" role="dialog" aria-modal="true" aria-labelledby="pet-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Close pet details" onClick={closePet}><Icon name="close" /></button>
            <div className="modal-image"><img src={selectedPet.image} alt={`${selectedPet.name}, a ${selectedPet.breed}`} />{selectedPet.score && <span>{selectedPet.score}% compatible</span>}</div>
            <div className="modal-content">
              <div className="eyebrow">Meet your potential companion</div>
              <h2 id="pet-modal-title">{selectedPet.name}</h2>
              <p className="modal-meta">{selectedPet.breed} Â· {selectedPet.age} Â· {selectedPet.gender}</p>
              <p className="modal-description">{selectedPet.description}</p>
              <div className="modal-traits">{selectedPet.traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
              {selectedPet.explanation && (
                <div className="explanation-box">
                  <strong><Icon name="sparkle" size={17} /> Why this match works</strong>
                  <ul>{selectedPet.explanation.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
                  <p><strong>Keep in mind:</strong> {selectedPet.explanation.consideration}</p>
                </div>
              )}
              <button className="primary-button wide" type="button">Request a meet-and-greet <Icon name="arrow" size={19} /></button>
              <small className="demo-note">Demo actionâ€”no request will be sent.</small>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}

export default App

