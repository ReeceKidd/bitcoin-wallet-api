/* eslint-disable no-useless-escape */
import request from "supertest";
import app from "../../src/app";

jest.setTimeout(100000);

describe("getAddress", () => {
  describe("success", () => {
    test("generates a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path  ", async () => {
      expect.assertions(3);
      const derivationPath = "m/84'/0'/0'/0/0";
      const mnemonicResponse = await request(app()).get("/mnemonic");
      const addressResponse = await request(app()).get(
        `/address?seedPhrase=${mnemonicResponse.text}&derivationPath=${derivationPath}`
      );
      expect(addressResponse.status).toBe(200);
      expect(addressResponse.text).toBeDefined();
      expect(addressResponse.text.length).toEqual(42);
    });
  });

  describe("errors", () => {
    test("fails when seed phrase is not provided", async () => {
      expect.assertions(2);
      const derivationPath = "m/84'/0'/0'/0/0";
      const addressResponse = await request(app()).get(
        `/address?derivationPath=${derivationPath}`
      );
      expect(addressResponse.status).toBe(422);
      expect(addressResponse.text).toContain('"seedPhrase" is required');
    });
    test("fails when derivation path is not provided", async () => {
      expect.assertions(2);
      const mnemonicResponse = await request(app()).get("/mnemonic");
      const addressResponse = await request(app()).get(
        `/address?seedPhrase=${mnemonicResponse.text}`
      );
      expect(addressResponse.status).toBe(422);
      expect(addressResponse.text).toContain('"derivationPath" is required');
    });
  });
});
