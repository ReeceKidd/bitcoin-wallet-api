/* eslint-disable @typescript-eslint/no-explicit-any */

import { getGenerateAddressMiddleware } from "./generateAddressMiddleware";

jest.mock("bitcoinjs-lib", () => ({
  networks: {
    bitcoin: "example",
  },
  payments: {
    p2wpkh: jest.fn(() => ({ address: "address" })),
  },
}));
jest.mock("bip39", () => ({
  mnemonicToSeedSync: jest.fn(() => "seed"),
  fromSeed: () => ({ derivePath: jest.fn(() => ({ publickKey: "key" })) }),
}));

describe("generateAddressMiddleware", () => {
  describe("success", () => {
    test("generates and sends address", async () => {
      expect.assertions(1);

      const request: any = {
        query: { seedPhrase: "seed phrase", derivationPath: "derivation path" },
      };
      const response: any = { locals: {}, send: jest.fn() };
      const next = jest.fn();
      const bip32 = {
        fromSeed: jest.fn(() => ({
          derivePath: jest.fn(() => ({ publicKey: "public key" })),
        })),
      };
      const middleware = await getGenerateAddressMiddleware(bip32 as any);
      middleware(request, response, next);

      expect(response.send).toBeCalledWith({ address: expect.any(String) });
    });
  });
  describe("errors", () => {
    test("next is called with error on error", async () => {
      expect.assertions(1);

      const request: any = {};
      const response: any = { locals: {}, send: jest.fn() };
      const next = jest.fn();
      const middleware = await getGenerateAddressMiddleware({} as any);
      middleware(request, response, next);

      expect(next).toBeCalledWith(expect.any(Object));
    });
  });
});
