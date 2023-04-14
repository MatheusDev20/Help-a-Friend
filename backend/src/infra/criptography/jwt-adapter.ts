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
    return new Promise((resolve) => {
      try {
        const decoded = jwt.verify(token, secret);
        resolve({
          veredict: true,
          sub: decoded.sub,
        });
      } catch (err: any) {
        throw new AppError('Token inválido', 401);
      }
    });
  }
}
