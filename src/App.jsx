import "./App.css";

function App() {
  return (
    <main className="app">
      <section className="hero">
        <div className="hero-content">
          <p className="tag">AI-Powered Adoption Assistant</p>

          <h1>Find the Right Pet for Your Lifestyle</h1>

          <p className="hero-text">
            AI Pet Adoption Matchmaker helps users find pets that fit their
            home, schedule, activity level, and experience.
          </p>

          <div className="buttons">
            <a href="#questionnaire" className="primary-btn">
              Start Matching
            </a>
            <a href="#features" className="secondary-btn">
              View Features
            </a>
          </div>
        </div>

        <div className="hero-card">
          <h2>Best Match</h2>
          <p className="pet-name">Luna</p>
          <p>Calm adult cat</p>
          <p>Apartment friendly</p>
          <div className="score">92% Match</div>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Project Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Lifestyle Questionnaire</h3>
            <p>
              Users answer questions about housing, schedule, activity level,
              and pet experience.
            </p>
          </div>

          <div className="feature-card">
            <h3>Recommendation Algorithm</h3>
            <p>
              The app calculates match scores based on user answers and pet
              personality traits.
            </p>
          </div>

          <div className="feature-card">
            <h3>AI Explanation</h3>
            <p>
              The system explains why each pet is a good match using simple and
              helpful language.
            </p>
          </div>
        </div>
      </section>

      <section id="questionnaire" className="questionnaire-preview">
        <h2>Questionnaire Coming Next</h2>
        <p>
          In the next step, we will build the form that asks users about their
          lifestyle and recommends pets.
        </p>
      </section>
    </main>
  );
}

export default App;