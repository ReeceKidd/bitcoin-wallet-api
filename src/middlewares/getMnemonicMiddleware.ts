import { Request, Response, NextFunction } from "express";
import * as bip39 from "bip39";

export const getMnemonicMiddlewareFactory =
  (getMnemicFunction: () => string) =>
  async (
    _request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const randomMnemonic = getMnemicFunction();
      response.send(randomMnemonic);
    } catch (err) {
      next(err);
    }
  };

export const getMnemonicMiddleware = getMnemonicMiddlewareFactory(
  bip39.generateMnemonic
);
