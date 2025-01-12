declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEBUG_RENDERER_URL?: string;
      FULLSCREEN?: string;
      LOG_LEVEL?: string;
      FORCE_LOCALE?: string;
      DUMMIES_FOLDER?: string;
    }
  }
}

export {};
