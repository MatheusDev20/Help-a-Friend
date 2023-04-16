/* eslint-disable no-useless-escape */
import { Pet } from './../interfaces/pet'

export const parsePetImg = (pet: Pet): string => {
  return JSON.parse(pet.pet_photos)[0].url
}

export const isEmpty = (obj: Object): boolean => {
  return Object.keys(obj).length === 0
}

export const validateEmail = (email: string): boolean => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  return false
}
