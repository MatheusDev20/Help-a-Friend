// import { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';
interface jwtConfig {
  jwt: {
    secret: string,
    expiresIn: string
  }
}

const authConfig: jwtConfig = {
  jwt: {
    secret: process.env.SECRET_JWT,
    expiresIn: '1d',
  },
};
export default authConfig;
// export default {
//   jwt: {
//     secret: process.env.SECRET_JWT,
//     expiresIn: '1d',
//   },
// };

// QF417382154BR;
