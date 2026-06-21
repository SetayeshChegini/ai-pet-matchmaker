import { useCallback, useMemo, useState } from 'react'
import Icon from './components/Icon'
import PetCard from './components/PetCard'
import PetModal from './components/PetModal'
import { pets } from './data/pets'
import { parseSharedAnswers, questionIds, questions } from './data/questions'
import { buildExplanation, rankPets } from './lib/scorer'
import './App.css'

function App() {
  const [sharedAnswers] = useState(() => parseSharedAnswers(window.location.search))
  const hasSharedResult = questionIds.every((id) => sharedAnswers[id])
  const [menuOpen, setMenuOpen] = useState(false)
  const [quizStarted, setQuizStarted] = useState(hasSharedResult)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(sharedAnswers)
  const [showResults, setShowResults] = useState(hasSharedResult)
  const [showAllMatches, setShowAllMatches] = useState(false)
  const [shareStatus, setShareStatus] = useState(hasSharedResult ? 'Shared result loaded' : '')
  const [selectedPet, setSelectedPet] = useState(null)
  const results = useMemo(() => rankPets(pets, answers), [answers])
  const visibleResults = showAllMatches ? results : results.slice(0, 3)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const clearSharedUrl = () => {
    if (window.location.search) {
      window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`)
    }
  }

  const beginQuiz = () => {
    clearSharedUrl()
    setQuizStarted(true)
    setShowResults(false)
    setShowAllMatches(false)
    setShareStatus('')
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
      setShowAllMatches(false)
      window.setTimeout(() => scrollTo('results'), 80)
      return
    }
    setCurrentQuestion((current) => current + 1)
  }

  const previousQuestion = () => {
    setCurrentQuestion((current) => Math.max(0, current - 1))
  }

  const retakeQuiz = () => {
    clearSharedUrl()
    setAnswers({})
    setCurrentQuestion(0)
    setShowResults(false)
    setShowAllMatches(false)
    setShareStatus('')
    setQuizStarted(true)
    scrollTo('match-quiz')
  }

  const shareResult = async () => {
    const params = new URLSearchParams()
    questionIds.forEach((id) => params.set(id, answers[id]))
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}#results`
    const shareData = {
      title: 'My PawPair pet match',
      text: `My top PawPair match is ${results[0].name} at ${results[0].score}% compatibility.`,
      url,
    }

    try {
      if (navigator.share && window.innerWidth < 760) {
        await navigator.share(shareData)
        setShareStatus('Result shared')
      } else {
        await navigator.clipboard.writeText(url)
        setShareStatus('Share link copied')
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setShareStatus('Copy the page URL to share your result')
    }
    window.setTimeout(() => setShareStatus(''), 3200)
  }

  const openPet = (pet, score = null, explanation = null) => {
    setSelectedPet({ ...pet, score, explanation })
  }

  const closePet = useCallback(() => setSelectedPet(null), [])

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
            <div className="eyebrow"><Icon name="sparkle" size={16} /> Explainable compatibility</div>
            <h1>Meet the pet who <em>fits your life.</em></h1>
            <p className="hero-lead">A thoughtful match is about more than a cute face. Tell us about your routine, home and experience - we will find companions ready to thrive with you.</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={beginQuiz}>Start your match <Icon name="arrow" size={19} /></button>
              <button className="secondary-button" type="button" onClick={() => scrollTo('how-it-works')}>See how it works</button>
            </div>
            <div className="trust-row">
              <div className="avatar-stack" aria-hidden="true">
                {pets.slice(0, 3).map((pet) => <img key={pet.id} src={pet.image} alt="" />)}
              </div>
              <p><strong>7 lifestyle signals weighted</strong><br />Every recommendation explained</p>
            </div>
          </div>

          <div className="hero-visual" aria-label="Example pet match">
            <div className="hero-blob hero-blob-one"></div>
            <div className="hero-blob hero-blob-two"></div>
            <div className="hero-image-card">
              <img src={pets[1].image} alt={`Milo, a ${pets[1].breed}`} style={{ objectPosition: pets[1].imagePosition }} />
              <div className="floating-pet-name">
                <span><strong>Milo</strong><small>{pets[1].breed} | {pets[1].age}</small></span>
                <span className="heart-button"><Icon name="heart" size={19} /></span>
              </div>
            </div>
            <div className="floating-match-card">
              <span className="mini-score">94%</span>
              <span><strong>Great match</strong><small>Friendly energy | People-loving</small></span>
            </div>
            <div className="floating-ai-card"><Icon name="sparkle" size={18} /> Matched to your lifestyle</div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Platform highlights">
          <div><strong>7</strong><span>Lifestyle signals</span></div>
          <div><strong>6</strong><span>Adoptable profiles</span></div>
          <div><strong>2 min</strong><span>To meet your match</span></div>
          <div><strong>100%</strong><span>Explainable scores</span></div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-heading centered">
            <div className="eyebrow">A better way to adopt</div>
            <h2>Compatibility first.<br /><em>Love follows.</em></h2>
            <p>Our explainable recommendation model looks at the parts of daily life that make a placement last.</p>
          </div>
          <div className="steps-grid">
            <article><span className="step-number">01</span><span className="step-icon peach"><Icon name="heart" /></span><h3>Tell us about you</h3><p>Share your home, routine, activity level and care preferences in a friendly two-minute quiz.</p></article>
            <article><span className="step-number">02</span><span className="step-icon green"><Icon name="brain" /></span><h3>We compare the fit</h3><p>Our model weighs seven compatibility signals against each pet&apos;s real needs and temperament.</p></article>
            <article><span className="step-number">03</span><span className="step-icon yellow"><Icon name="sparkle" /></span><h3>Meet your matches</h3><p>See your strongest matches, a clear explanation and anything important to consider before meeting.</p></article>
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
                <div className="quiz-progress-row"><span>Question {currentQuestion + 1} of {questions.length}</span><span>{Math.round(progress)}% complete</span></div>
                <div className="progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${progress}%` }}></span></div>
                <div className="question-copy"><span>{question.eyebrow}</span><h3>{question.question}</h3><p>{question.helper}</p></div>
                <div className={`options-grid ${question.options.length === 2 ? 'two-options' : ''}`}>
                  {question.options.map((option) => (
                    <button key={option.value} type="button" className={answerSelected === option.value ? 'option-card selected' : 'option-card'} aria-pressed={answerSelected === option.value} onClick={() => chooseOption(option.value)}>
                      <span className="option-symbol"><Icon name={option.icon} size={20} /></span>
                      <span><strong>{option.label}</strong><small>{option.detail}</small></span>
                      <span className="option-check"><Icon name="check" size={15} /></span>
                    </button>
                  ))}
                </div>
                <div className="quiz-controls">
                  <button type="button" className="back-button" disabled={currentQuestion === 0} onClick={previousQuestion}>Back</button>
                  <button type="button" className="next-button" disabled={!answerSelected} onClick={nextQuestion}>{currentQuestion === questions.length - 1 ? 'See my matches' : 'Continue'} <Icon name="arrow" size={18} /></button>
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
              <div><div className="eyebrow"><Icon name="sparkle" size={16} /> Your personalized results</div><h2>Your strongest <em>matches.</em></h2><p>These pets align most closely with your lifestyle profile. Compatibility is a starting point - the real connection happens when you meet.</p></div>
              <div className="result-actions">
                <button className="share-button" type="button" onClick={shareResult}><Icon name="share" size={17} /> Share result</button>
                <button className="retake-button" type="button" onClick={retakeQuiz}>Retake quiz</button>
                {shareStatus && <span className="share-status" role="status">{shareStatus}</span>}
              </div>
            </div>
            <div className="match-summary">
              <div className="score-ring" style={{ '--score': `${results[0].score * 3.6}deg` }}><span>{results[0].score}<small>%</small></span></div>
              <div><span>Top compatibility insight</span><h3>{results[0].name} fits the rhythm of your everyday life.</h3><p>{buildExplanation(results[0], answers).reasons.join('. ')}.</p></div>
            </div>
            <div className={`match-grid ${showAllMatches ? 'show-all' : ''}`}>
              {visibleResults.map((pet, index) => <PetCard key={pet.id} pet={pet} score={pet.score} rank={index + 1} answers={answers} onOpen={openPet} />)}
            </div>
            <button className="show-matches-button" type="button" onClick={() => setShowAllMatches((current) => !current)}>
              {showAllMatches ? 'Show top 3 only' : 'Show all 6 ranked matches'} <Icon name="chevron" size={17} />
            </button>
            <div className="model-note"><Icon name="brain" size={22} /><p><strong>How your score works</strong> We compare home fit, schedule, energy, experience, grooming, allergies and species preference. No single answer decides a match.</p></div>
          </section>
        )}

        <section className="pets-section" id="pets">
          <div className="section-heading split"><div><div className="eyebrow">Ready to be discovered</div><h2>Wonderful pets.<br /><em>Real personalities.</em></h2></div><p>Every profile includes care needs and temperament - not just a photo - so you can imagine everyday life together.</p></div>
          <div className="all-pets-grid">{pets.map((pet) => <PetCard key={pet.id} pet={pet} onOpen={openPet} />)}</div>
        </section>

        <section className="cta-section">
          <div className="cta-paws" aria-hidden="true"><Icon name="paw" size={92} /></div>
          <div className="eyebrow light">Your next chapter has paws</div><h2>Ready to meet your match?</h2><p>Seven questions can bring you one step closer to a companion who truly fits.</p>
          <button className="primary-button light-button" type="button" onClick={beginQuiz}>Find my pet <Icon name="arrow" size={19} /></button>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Icon name="paw" size={22} /></span><span>Paw<span>Pair</span></span></a>
        <p>Thoughtful technology for happier adoptions.</p>
        <span>Portfolio MVP | Explainable recommendation model</span>
      </footer>

      {selectedPet && <PetModal pet={selectedPet} onClose={closePet} />}
    </div>
  )
}

export default App


