import dotenv from 'dotenv';
import app from './config/app';

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`App Running on PORT: ${process.env.PORT}`);
});
