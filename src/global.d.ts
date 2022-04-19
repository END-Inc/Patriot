declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      token: string;
      clown: string;
      uaUser: string;
      ruUser: string;
      katsap: string;
      guild: string;
      bump: string;
    }
  }
}

export {}