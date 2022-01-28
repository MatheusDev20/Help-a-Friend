import app from './config/app';

app.listen(process.env.PORT, () => {
  console.log(`App Running on PORT: ${process.env.PORT}`);
});
