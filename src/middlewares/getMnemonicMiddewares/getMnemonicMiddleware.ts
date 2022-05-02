import { Request, Response, NextFunction } from "express";
import * as bip39 from "bip39";

export const getMnemonicMiddlewareFactory =
  (getMnemonicFunction: () => string) =>
  async (
    _request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const mnemonic = getMnemonicFunction();
      response.send({ mnemonic });
    } catch (err) {
      next(err);
    }
  };

export const getMnemonicMiddleware = getMnemonicMiddlewareFactory(
  bip39.generateMnemonic
);
