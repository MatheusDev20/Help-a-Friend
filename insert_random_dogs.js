const axios = require('axios')
const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const genders = ['M', 'F']
const sizes = ['Grande', 'Médio', 'Pequeno']
const species = ['Cachorro', 'Gato']
const makeRandomDogName = () => {
  let randomLen = getRandomLen(5, 7)
  let word = '';
  for (let i = 0; i < randomLen; i++) {
    word += possibleChars.charAt(getRandomLen(0, possibleChars.length))
  }

  return word
}
const getRandomLen = (min, max) => {
  min = Math.ceil(min) // Retorna o menor numero mais proximo de min
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const pickFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

for (let i = 0; i < 30; i++) {
  const randomDog = {
    name: makeRandomDogName(),
    gender: pickFromArray(genders),
    size: pickFromArray(sizes),
    specie: pickFromArray(species),
    history: `Historia do`,
    castrated: true,
    vaccinated: true,
    city: 'Juiz de Fora',
    uf: 'Minas Gerais'
  }
  randomDog.history = randomDog.history + ' ', randomDog.name
  axios.post('https://pure-depths-09351.herokuapp.com/api/pet', randomDog, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjE1NjEyNTIsImV4cCI6MTY2MTY0NzY1Miwic3ViIjoiOTExOTczYmYtMjgyZi00Yjc2LTk5YjQtYTVmN2FjNzU3YmNkIn0.t2bmZp1Hb0tvhMWMFAuH8oqNxmNF-2o_CvNJKnJt8yg'
    },
  }).then((res) => console.log(res.data))
}


