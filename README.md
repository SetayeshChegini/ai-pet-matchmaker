# PawPair â€” AI Pet Adoption Matchmaker

PawPair is a responsive pet-adoption matching experience that recommends compatible pets from an adopter's lifestyle profile. The application scores home type, schedule, activity level, pet-care experience, grooming preferences, allergies, and species preference, then explains why each recommendation may fit.

## Features

- Seven-step lifestyle questionnaire
- Explainable weighted compatibility model
- Ranked pet recommendations with match percentages
- Personalized reasons and adoption considerations
- Responsive pet profiles and detail dialogs
- Accessible controls, progress indicators, and reduced-motion support
- No account or API key required for the demo

## Recommendation model

The client-side model scores seven compatibility signals with different weights. Schedule and home fit receive the strongest weights, followed by energy, care experience, allergies, grooming, and species preference. The result is intentionally transparent: every recommendation includes the reasons that raised its score and an important consideration for the adopter.

This MVP keeps recommendations deterministic and inspectable. A production version could store pets and adopter profiles in PostgreSQL, expose the scorer through a Node.js API, and use an OpenAI layer to turn the structured score into more conversational explanations without allowing the language model to override safety or care requirements.

## Run locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run build
```

## Stack

React 19, Vite, JavaScript, CSS, and an explainable weighted recommendation model.

