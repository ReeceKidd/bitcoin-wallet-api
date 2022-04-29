import request from "supertest";
import app from "../../src/app";

jest.setTimeout(100000);

describe("generateMultiSigAddress", () => {
  test("generates an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and public keys can be specified ", async () => {
    expect.assertions(1);
    const m = 2;
    const n = 3;
    const publicKeys = [
      "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
      "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
      "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9",
    ];

    const multiSignatureAddressResponse = await request(app()).get(
      `/multi-sig-address?m=${m}&n=${n}&publicKeys=${publicKeys}`
    );
    expect(multiSignatureAddressResponse.text).toBeDefined();
  });
});
