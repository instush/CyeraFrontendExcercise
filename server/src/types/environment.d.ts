declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT?: "development" | "production";
      RANDOM_ERRORS_CHANCE?: string;
      PORT?: string;
    }
  }
}
export {};
