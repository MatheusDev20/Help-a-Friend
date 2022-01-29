declare namespace NodeJS {
  interface ProcessEnv {
    LOCAL_API_URL: string;
    PORT: number;
    DATABASE_URL: string;
    SECRET_JWT: string
  }
}
