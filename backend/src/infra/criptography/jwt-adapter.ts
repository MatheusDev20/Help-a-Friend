import jwt from 'jsonwebtoken';
import { GenerateToken, GenerateTokenData } from '../../data/protocols/criptography/generate-jwt';

export class JwtAdapter implements GenerateToken {
  public async generate({ sub, secret, expiresIn }: GenerateTokenData): Promise<string> {
    const accessToken = jwt.sign({}, secret, {
      subject: sub,
      expiresIn,
    });
    return accessToken;
  }
}
