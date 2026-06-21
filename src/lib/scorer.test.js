import { describe, expect, it } from 'vitest'
import { buildExplanation, rankPets, scorePet } from './scorer'

const calmCat = {
  id: 1,
  name: 'Luna',
  species: 'cat',
  energy: 'calm',
  homes: ['apartment', 'small-house', 'large-house'],
  independence: 'high',
  experience: 'first',
  grooming: 'low',
  allergyFriendly: false,
}

const idealAnswers = {
  home: 'apartment',
  schedule: 'high',
  activity: 'calm',
  experience: 'first',
  grooming: 'low',
  allergies: 'no',
  species: 'cat',
}

describe('scorePet', () => {
  it('allows a genuinely perfect fit to score 100%', () => {
    expect(scorePet(calmCat, idealAnswers)).toBe(100)
  })

  it('penalizes mismatched home, schedule, energy and experience needs', () => {
    const activeDog = {
      ...calmCat,
      id: 2,
      name: 'Nala',
      species: 'dog',
      energy: 'active',
      homes: ['large-house'],
      independence: 'low',
      experience: 'experienced',
      grooming: 'high',
    }

    expect(scorePet(activeDog, idealAnswers)).toBeLessThan(40)
  })

  it('returns pets in descending score order with stable ties', () => {
    const slightlyHarderPet = { ...calmCat, id: 2, name: 'Milo', grooming: 'medium' }
    const ranked = rankPets([slightlyHarderPet, calmCat], idealAnswers)

    expect(ranked.map((pet) => pet.name)).toEqual(['Luna', 'Milo'])
  })
})

describe('buildExplanation', () => {
  it('calls out an allergy consideration when a pet is not allergy-friendly', () => {
    const explanation = buildExplanation(calmCat, { ...idealAnswers, allergies: 'yes' })

    expect(explanation.consideration).toContain('medical professional')
    expect(explanation.reasons).toHaveLength(3)
  })

  it('explains why an independent pet fits a longer workday', () => {
    const explanation = buildExplanation(calmCat, idealAnswers)

    expect(explanation.reasons[1]).toContain('longer workdays')
  })
})

