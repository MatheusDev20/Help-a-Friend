interface CreatePetDTO {
  id: string;
  name: string;
  user_id: string;
  gender: string;
  size: string;
  history: string;
  castrated: boolean;
  vaccinated: boolean;
  city: string;
  uf: string
  pet_location: string
  pet_owner_email?: string
  specie: string
}

export default CreatePetDTO;
