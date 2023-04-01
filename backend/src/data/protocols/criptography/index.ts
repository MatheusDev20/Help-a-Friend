export interface GenerateTokenData {
  sub: string;
  expiresIn: string;
  secret: string;
}
export interface VerifyTokenData {
  token: string;
  secret: string;
}
export interface VerifyTokenResponse {
  veredict: boolean;
  sub: any;
}

export interface Criptography {
    generate: (tokenData: GenerateTokenData) => Promise<string>
    verify: (verifyData: VerifyTokenData) => Promise<VerifyTokenResponse>
  }
