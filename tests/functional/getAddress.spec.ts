import request from "supertest";
import app from "../../src/app";

jest.setTimeout(100000);

describe("getAddress", () => {
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
