/* eslint-disable @typescript-eslint/no-explicit-any */

import { getMnemonicMiddlewareFactory } from "./getMnemonicMiddleware";

describe("getMnemonicMiddleware", () => {
  describe("success", () => {
    test("gets and sends a mnemonic", async () => {
      expect.assertions(2);

      const request: any = {};
      const response: any = { locals: {}, send: jest.fn() };
      const next = jest.fn();

      const mnemonic = "mnmonic";
      const getMnemonic = jest.fn(() => mnemonic);
      const middleware = await getMnemonicMiddlewareFactory(getMnemonic);
      middleware(request, response, next);

      expect(getMnemonic).toBeCalled();
      expect(response.send).toBeCalledWith({ mnemonic });
    });
  });
  describe("errors", () => {
    test("next is called with error on error", async () => {
      expect.assertions(1);

      const request: any = {};
      const response: any = { locals: {} };
      const next = jest.fn();
      const middleware = await getMnemonicMiddlewareFactory(jest.fn());
      middleware(request, response, next);

      expect(next).toBeCalledWith(expect.any(Object));
    });
  });
});
