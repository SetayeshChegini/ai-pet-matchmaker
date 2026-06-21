# PawPair - AI Pet Adoption Matchmaker

PawPair is a responsive pet-adoption matching experience that recommends compatible pets from an adopter's lifestyle profile. The application scores home type, schedule, activity level, pet-care experience, grooming preferences, allergies, and species preference, then explains why each recommendation may fit.

## Features

- Seven-step lifestyle questionnaire
- Explainable weighted compatibility model
- Ranked pet recommendations with match percentages
- Personalized reasons and adoption considerations
- Shareable result links that restore the full lifestyle profile
- Auto-advancing questions with explicit back and continue controls
- Meet-and-greet confirmation state and keyboard-accessible modal
- Responsive pet profiles and detail dialogs
- Accessible controls, progress indicators, and reduced-motion support
- No account or API key required for the demo

## Recommendation model

The client-side model scores seven compatibility signals with different weights. Schedule and home fit receive the strongest weights, followed by energy, care experience, allergies, grooming, and species preference. The result is intentionally transparent: every recommendation includes the reasons that raised its score and an important consideration for the adopter.

This MVP keeps recommendations deterministic and inspectable. A production version could store pets and adopter profiles in PostgreSQL, expose the scorer through a Node.js API, and use an OpenAI layer to turn the structured score into more conversational explanations without allowing the language model to override safety or care requirements.

## Design decisions

- **Schedule and home fit carry the most weight** because a mismatch in daily availability or living space is harder to solve than a grooming preference.
- **Scores stay explainable**: the interface shows the signals behind each recommendation and an honest consideration instead of presenting a black-box answer.
- **Every choice is confirmed with Continue**, giving users time to review or change a selection before moving to the next question.
- **Results are encoded in the URL** so users can share or bookmark a match without creating an account or storing personal answers on a server.
- **The visual system uses warm coral and deep green** to feel welcoming and adoption-focused without relying on the bright blue palette common to generic technology demos.
- **All six pets remain discoverable** both in browsing and ranked results so lower-scoring options are explained rather than silently hidden.

## Run locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run test
npm run build
```

## Stack

React 19, Vite, JavaScript, CSS, and an explainable weighted recommendation model.



