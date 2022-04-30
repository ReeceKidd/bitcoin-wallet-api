import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const getQueryValidationMiddleware =
  (schema: Joi.ObjectSchema) =>
  (request: Request, response: Response, next: NextFunction) => {
    const { error } = schema.validate(request.query);
    if (error) {
      return response.status(422).send(error.details[0].message);
    }
    next();
  };
