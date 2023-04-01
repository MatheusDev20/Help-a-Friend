import jwt from 'jsonwebtoken';
import AppError from '../../presentation/errors/AppError';
import {
  VerifyTokenData, Criptography, GenerateTokenData, VerifyTokenResponse,
} from '../../data/protocols';

export class JwtAdapter implements Criptography {
  public async generate({ sub, secret, expiresIn }: GenerateTokenData): Promise<string> {
    const accessToken = jwt.sign({}, secret, {
      subject: sub,
      expiresIn,
    });
    return accessToken;
  }

  public async verify({ token, secret }: VerifyTokenData): Promise<VerifyTokenResponse> {
    try {
      const decoded = jwt.verify(token, secret);
      return {
        veredict: true,
        sub: decoded.sub,
      };
    } catch (err) {
      throw new AppError('Token is not valid');
    }
  }
}
