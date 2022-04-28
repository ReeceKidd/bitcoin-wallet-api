import { Request, Response, NextFunction } from "express";
import * as bip39 from "bip39";

export const getMnemonicMiddleware =
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

export const mnemonicMiddleware = getMnemonicMiddleware(bip39.generateMnemonic);
