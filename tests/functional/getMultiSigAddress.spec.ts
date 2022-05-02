import request from "supertest";
import app from "../../src/app";

jest.setTimeout(100000);

describe("getMultiSigAddress", () => {
  const bitcoinAddressRegex = RegExp("^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$");
  describe("success", () => {
    test("generates an n-out-of-m Multi signature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and public keys are specified ", async () => {
      expect.assertions(2);
      const m = "2";
      const n = "3";
      const publicKeys = [
        "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
        "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
        "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9",
      ];
      const url = `/multi-sig-address?n=${n}&m=${m}&publicKeys[]=${publicKeys}`;
      const response = await request(app()).get(url);
      expect(response.status).toBe(200);
      expect(response.body.address).toMatch(bitcoinAddressRegex);
    });
  });
  describe("errors", () => {
    describe("validation", () => {
      test("fails when m is not provided", async () => {
        expect.assertions(2);
        const n = 3;
        const publicKeys = [
          "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
          "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
          "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9",
        ];
        const response = await request(app()).get(
          `/multi-sig-address?n=${n}&publicKeys[]=${publicKeys}`
        );
        expect(response.status).toBe(422);
        expect(response.text).toContain('"m" is required');
      });
      test("fails when m is not a number", async () => {
        expect.assertions(2);
        const m = "test";
        const n = 3;
        const publicKeys = [
          "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
          "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
          "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9",
        ];
        const response = await request(app()).get(
          `/multi-sig-address?m=${m}n=${n}&publicKeys[]=${publicKeys}`
        );
        expect(response.status).toBe(422);
        expect(response.text).toContain('"m" must be a number');
      });
      test("fails when n is not provided", async () => {
        expect.assertions(2);
        const m = 2;
        const publicKeys = [
          "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
          "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
          "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9",
        ];
        const response = await request(app()).get(
          `/multi-sig-address?m=${m}&publicKeys[]=${publicKeys}`
        );
        expect(response.status).toBe(422);
        expect(response.text).toContain('"n" is required');
      });
      test("fails when n is not a number", async () => {
        expect.assertions(2);
        const m = 2;
        const n = "test";
        const publicKeys = [
          "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
          "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
          "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9",
        ];
        const response = await request(app()).get(
          `/multi-sig-address?m=${m}&n=${n}&publicKeys[]=${publicKeys}`
        );
        expect(response.status).toBe(422);
        expect(response.text).toContain('"n" must be a number');
      });
      test("fails when public keys are not provided", async () => {
        expect.assertions(2);
        const m = 2;
        const n = 3;
        const response = await request(app()).get(
          `/multi-sig-address?m=${m}&n=${n}`
        );
        expect(response.status).toBe(422);
        expect(response.text).toContain('"publicKeys" is required');
      });
      test("fails when public keys param is not an array", async () => {
        expect.assertions(2);
        const m = 2;
        const n = 3;
        const publicKeys = "test";
        const response = await request(app()).get(
          `/multi-sig-address?m=${m}&n=${n}&publicKeys=${publicKeys}`
        );
        expect(response.status).toBe(422);
        expect(response.text).toContain('"publicKeys" must be an array');
      });
    });
  });
});
