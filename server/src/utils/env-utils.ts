import dotenv from "dotenv";
import path from "path";

const validateEnvironment = (environment?: string): void => {
  if (!environment) {
    throw new Error("ENVIRONMENT variable is not set");
  }
  const validEnvironments = ["development", "staging", "production"];
  if (!validEnvironments.includes(environment.toLowerCase())) {
    const validEnvironmentsString = validEnvironments.join(", ");
    throw new Error(
      `Invalid ENVIRONMENT value. Must be one of: ${validEnvironmentsString}`
    );
  }
};

const validatePort = (port?: string): void => {
  if (!port) {
    throw new Error("PORT variable is not set");
  }
  if (Number.isNaN(Number.parseInt(port))) {
    throw new Error("PORT variable is not a number");
  }
};

const validateRandomErrorsChance = (randomErrorsChance?: string): void => {
  if (!randomErrorsChance) {
    throw new Error("RANDOM_ERRORS_CHANCE variable is not set");
  }
  if (Number.isNaN(Number.parseInt(randomErrorsChance))) {
    throw new Error("RANDOM_ERRORS_CHANCE variable is not a number");
  }
};

const validateEnvs = (): void => {
  validateEnvironment(process.env.ENVIRONMENT);
  validatePort(process.env.PORT);
  validateRandomErrorsChance(process.env.RANDOM_ERRORS_CHANCE);
};

export const printEnvs = (): void => {
  console.log(`Environment: ${process.env.ENVIRONMENT}`);
  console.log(`Port: ${process.env.PORT}`);
  console.log(`Random errors chance: ${process.env.RANDOM_ERRORS_CHANCE}`);
};

export const loadEnvs = (): void => {
  dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
  validateEnvs();
};
