export interface CreatePetDTO {
  name: string;
  user_id: string;
  gender: string;
  size: string;
  history: string;
  castrated: boolean;
  vaccinated: boolean;
  city: string;
  uf: string;
  specie: string;
}

export interface CreatedDogResponse {
  id: string
  name: string
}
