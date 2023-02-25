import { Pet } from './../../interfaces/pet'

import { Filters, RegisterPetData } from '../../interfaces'
import { HafApi } from './haf_backend'

export const getPetPage = async (page: string): Promise<Pet[]> => {
  try {
    const response = await HafApi.get(`/api/pet/list?page=${page}`)
    return response.data
  } catch (err) {
    throw new Error('Error searching pet page')
  }
}

export const getPageWithFilters = async (page: string, filters: Filters): Promise<Pet[]> => {
  try {
    const recoveryPage = await HafApi.get(`/api/pet/list?page=${page}&gender=${filters.gender}&size=${filters.size}&specie=${filters.specie}`)
    return recoveryPage.data
  } catch (err) {
    throw new Error('Error searching pet with filters')
  }
}

export const uploadImages = async (files: File[], dogName: string): Promise<void> => {
  try {
    const formData = new FormData()
    for (const file of files) {
      formData.append('photos', file)
    }
    await HafApi.post(`/api/pet/upload?name=${dogName}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export const createPet = async (petInfo: RegisterPetData): Promise<void> => {
  const response = await HafApi.post('/api/pet', petInfo)
  return response.data
}

export const getPetInfo = async (petId: string): Promise<Pet> => {
  try {
    const response = await HafApi.get(`/api/pet/${petId}`)
    return response.data
  } catch (err) {
    throw new Error('Erro ao carregar dados do animal')
  }
}
