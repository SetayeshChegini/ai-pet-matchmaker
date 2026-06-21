export const questions = [
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
      { value: 'medium', label: '4-8 hours', detail: 'A typical workday with time before and after', icon: 'clock' },
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

export const questionIds = questions.map((question) => question.id)

export const parseSharedAnswers = (search = '') => {
  const params = new URLSearchParams(search)
  const answers = {}

  questions.forEach((question) => {
    const value = params.get(question.id)
    if (question.options.some((option) => option.value === value)) {
      answers[question.id] = value
    }
  })

  return answers
}

