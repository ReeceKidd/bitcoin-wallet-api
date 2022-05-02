import request from "supertest";
import app from "../../src/app";

jest.setTimeout(100000);

describe("getMnemonic", () => {
  describe("success", () => {
    test("sends random mnemonic following BIP39 standard", async () => {
      expect.assertions(2);
      const response = await request(app()).get("/mnemonic");
      expect(response.body.mnemonic).toBeDefined();
      expect(response.body.mnemonic.split(" ")).toHaveLength(12);
    });
  });
});
