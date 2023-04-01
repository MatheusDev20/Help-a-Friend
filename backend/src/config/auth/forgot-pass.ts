interface ForgotPassJwt {
    secret: string
    expiresIn: string
}
const forgotPassConfig: ForgotPassJwt = {
  secret: process.env.SECRET_FORGOT_PASSWORD, // md5 -> help_a_friend
  expiresIn: '15min',
};

export default forgotPassConfig;
