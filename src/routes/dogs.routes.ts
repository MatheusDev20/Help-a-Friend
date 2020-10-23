import { Router } from 'express';
import CreateDogService from '../services/CreateDogsService';

const dogsRouter = Router();

// Create new User
dogsRouter.post('/', async (req, res) => {
  try {
    const {
      name, gender, size, history, castrated, vaccinated, user,
    } = req.body;
    const createDog = new CreateDogService();
    const dog = await createDog.execute({
      name, gender, size, user_id: user, history, castrated, vaccinated,
    });
    return res.json(dog);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default dogsRouter;
