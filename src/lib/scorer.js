const activityRank = { calm: 0, balanced: 1, active: 2 }
const groomingRank = { low: 0, medium: 1, high: 2 }
const experienceRank = { first: 0, some: 1, experienced: 2 }

export function scorePet(pet, answers) {
  let score = 0

  score += pet.homes.includes(answers.home)
    ? 18
    : answers.home === 'small-house' && pet.homes.includes('apartment')
      ? 12
      : 4

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
  score += adopterExperience >= petExperience
    ? 12
    : adopterExperience + 1 === petExperience
      ? 7
      : 2

  score += groomingRank[answers.grooming] >= groomingRank[pet.grooming]
    ? 10
    : groomingRank[answers.grooming] + 1 === groomingRank[pet.grooming]
      ? 5
      : 1
  score += answers.allergies === 'no' ? 12 : pet.allergyFriendly ? 12 : 2
  score += answers.species === 'flexible' || answers.species === pet.species ? 10 : 1

  return Math.min(100, Math.round(score))
}

export function buildExplanation(pet, answers) {
  const homeReason = pet.homes.includes(answers.home)
    ? `${pet.name} is comfortable in your type of home`
    : `${pet.name} may need a little more space planning`
  const scheduleReason = answers.schedule === 'high' && pet.independence === 'high'
    ? `${pet.name}'s independent nature fits longer workdays`
    : answers.schedule === 'low' && pet.independence === 'low'
      ? `Your flexible schedule offers the companionship ${pet.name} enjoys`
      : `${pet.name}'s routine can work well with your daily availability`
  const energyReason = activityRank[answers.activity] === activityRank[pet.energy]
    ? 'Your preferred activity level is an excellent match'
    : 'A small adjustment in daily activity would keep you both fulfilled'

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

export function rankPets(pets, answers) {
  return pets
    .map((pet) => ({ ...pet, score: scorePet(pet, answers) }))
    .sort((a, b) => b.score - a.score || a.id - b.id)
}

