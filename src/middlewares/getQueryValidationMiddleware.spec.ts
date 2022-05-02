/* eslint-disable @typescript-eslint/no-explicit-any */

import { getQueryValidationMiddleware } from "./getQueryValidationMiddleware";

describe("getQueryValidationMiddleware", () => {
  describe("success", () => {
    test("calls next when there is no error", async () => {
      expect.assertions(1);

      const request: any = { query: {} };
      const response: any = { status: jest.fn(() => ({ send: jest.fn() })) };
      const next = jest.fn();

      const schema = {
        validate: jest.fn(() => ({})),
      };
      const middleware = await getQueryValidationMiddleware(schema as any);
      middleware(request, response, next);

      expect(next).toBeCalled();
    });
  });
  describe("errors", () => {
    test("when there is an error respond with status 422 and error message", async () => {
      expect.assertions(3);

      const send = jest.fn();
      const request: any = { query: {} };
      const response: any = { status: jest.fn(() => ({ send })) };
      const next = jest.fn();

      const errorMessage = "error";
      const schema = {
        validate: jest.fn(() => ({
          error: { details: [{ message: errorMessage }] },
        })),
      };
      const middleware = await getQueryValidationMiddleware(schema as any);
      middleware(request, response, next);

      expect(next).not.toBeCalled();
      expect(response.status).toBeCalledWith(422);
      expect(send).toBeCalledWith(errorMessage);
    });
  });
});
