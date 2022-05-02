/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import * as bitcoin from "bitcoinjs-lib";

export const getGenerateMultiSigAddressMiddleware =
  (bitcoin: any) =>
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { m, n } = request.query;
      const publicKeys =
        request.query.publicKeys &&
        decodeURIComponent(request.query.publicKeys as string);
      const pubkeys: Buffer[] | undefined = publicKeys
        ? publicKeys
            .split(",")
            ?.map((pubkey) => pubkey && Buffer.from(pubkey, "hex"))
            .filter((pubkey): pubkey is Buffer => !!pubkey)
        : undefined;
      const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({
          m: Number(m),
          n: Number(n),
          pubkeys,
        }),
      });
      response.send({ address });
    } catch (err) {
      console.log("Error", (err as any).message);
      next(err);
    }
  };

export const generateMultiSigAddressMiddleware =
  getGenerateMultiSigAddressMiddleware(bitcoin);
