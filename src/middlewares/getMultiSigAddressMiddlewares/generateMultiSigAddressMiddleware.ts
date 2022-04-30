import { Request, Response, NextFunction } from "express";
import * as bitcoin from "bitcoinjs-lib";

export const getGenerateMultiSigAddressMiddleware =
  () =>
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { m, n, publicKeys } = request.query;
      const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({
          m: Number(m),
          n: Number(n),
          pubkeys: (publicKeys as string)
            .split(",")
            .map((pubkey) => Buffer.from(pubkey, "hex")),
        }),
      });
      response.send(address);
    } catch (err) {
      next(err);
    }
  };

export const generateMultiSigAddressMiddleware =
  getGenerateMultiSigAddressMiddleware();
