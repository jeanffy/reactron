declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEBUG_LOG?: string;
    }
  }
}

export {};
