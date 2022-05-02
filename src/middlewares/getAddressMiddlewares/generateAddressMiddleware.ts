import { Request, Response, NextFunction } from "express";
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
const bip32 = BIP32Factory(ecc);

export const getGenerateAddressMiddleware =
  () =>
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { seedPhrase, derivationPath } = request.query;
      const seed = bip39.mnemonicToSeedSync(seedPhrase as string, "");
      const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
      const { publicKey } = root.derivePath(derivationPath as string);
      const address = bitcoin.payments.p2wpkh({ pubkey: publicKey }).address;
      response.send({ address });
    } catch (err) {
      next(err);
    }
  };

export const generateAddressMiddleware = getGenerateAddressMiddleware();
