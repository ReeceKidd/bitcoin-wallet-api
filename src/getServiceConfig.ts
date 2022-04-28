import dotenv from "dotenv";
dotenv.config();

export interface AppConfigHttp {
  NODE_ENV: string;
  PORT: string;
}

export type AppConfig = AppConfigHttp;

export const getServiceConfig = (
  environment: NodeJS.ProcessEnv = process.env
): AppConfig => {
  const { NODE_ENV, PORT } = environment;

  if (!NODE_ENV) throw new Error("NODE_ENV is not provided.");

  if (!PORT) throw new Error("PORT is not provided.");

  return {
    NODE_ENV,
    PORT,
  } as AppConfigHttp;
};
