/* eslint-disable @typescript-eslint/no-explicit-any */

import { getGenerateMultiSigAddressMiddleware } from "./generateMultiSigAddressMiddleware";

describe("generateMultiSigAddressMiddleware", () => {
  describe("success", () => {
    test("gets and sends a multi signature address", async () => {
      expect.assertions(3);

      const request: any = {
        query: { m: "1", n: "2", publicKeys: ["1,2,3,4"] },
      };
      const response: any = { locals: {}, send: jest.fn() };
      const next = jest.fn();

      const address = "1234";
      const p2sh = jest.fn(() => ({
        address,
      }));
      const p2ms = jest.fn();
      const bitcoin = {
        payments: {
          p2sh,
          p2ms,
        },
      };
      const middleware = await getGenerateMultiSigAddressMiddleware(bitcoin);
      middleware(request, response, next);

      expect(p2sh).toBeCalled();
      expect(p2ms).toBeCalled();
      expect(response.send).toBeCalledWith({ address });
    });
  });
  describe("errors", () => {
    test("next is called with error on error", async () => {
      expect.assertions(1);

      const request: any = {};
      const response: any = { locals: {} };
      const next = jest.fn();
      const middleware = await getGenerateMultiSigAddressMiddleware({} as any);
      middleware(request, response, next);

      expect(next).toBeCalledWith(expect.any(Object));
    });
  });
});
