import Joi from "joi";
import { getQueryValidationMiddleware } from "../getQueryValidationMiddleware";
import { generateAddressMiddleware } from "./generateAddressMiddleware";

const schema = Joi.object({
  seedPhrase: Joi.string().required(),
  derivationPath: Joi.string().required(),
});

export const getAddressMiddlewares = [
  getQueryValidationMiddleware(schema),
  generateAddressMiddleware,
];
