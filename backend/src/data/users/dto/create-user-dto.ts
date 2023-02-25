interface CreateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  petPreference: string;
  admin: boolean;
}

export default CreateUserDTO;
