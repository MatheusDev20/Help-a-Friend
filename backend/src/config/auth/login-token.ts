interface JWT {
  secret: string
  expiresIn: string
}
const authConfig: JWT = {
  secret: process.env.SECRET_JWT_LOGIN, // md5 -> help_a_friend
  expiresIn: '1d',
};

export default authConfig;
