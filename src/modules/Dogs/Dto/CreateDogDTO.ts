import { Gender } from '../Infra/typeorm/entities/Dogs';

interface CreateDogDTO {
    id: string;
    name: string;
    user_id: string;
    gender: Gender;
    size: string;
    history: string;
    castrated: boolean;
    vaccinated: boolean;
}

export default CreateDogDTO;
