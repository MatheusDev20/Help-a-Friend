export interface GenerateTokenData {
  sub: string;
  expiresIn: string;
  secret: string;
}

export interface GenerateToken {
    generate: (tokenData: GenerateTokenData) => Promise<string>
  }
