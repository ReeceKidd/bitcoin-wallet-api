import Joi from "joi";
import { getQueryValidationMiddleware } from "../getQueryValidationMiddleware";
import { generateMultiSigAddressMiddleware } from "./generateMultiSigAddressMiddleware";

const schema = Joi.object({
  m: Joi.number().required(),
  n: Joi.number().required(),
  publicKeys: Joi.array().required().items(Joi.string().required()),
});

export const getMultiSigAddressMiddlewares = [
  getQueryValidationMiddleware(schema),
  generateMultiSigAddressMiddleware,
];
