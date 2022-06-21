interface CreatePetDTO {
  id: string;
  name: string;
  user_id: string;
  gender: string;
  size: string;
  history: string;
  castrated: boolean;
  vaccinated: boolean;
}

export default CreatePetDTO;
