import { Pet } from './../interfaces/pet'

export const parsePetImg = (pet: Pet): string => {
  return JSON.parse(pet.pet_photos)[0].url
}
export const isEmpty = (obj: Object): boolean => {
  return Object.keys(obj).length === 0
}
