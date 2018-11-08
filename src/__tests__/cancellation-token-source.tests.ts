import CancellationTokenSource from "../cancellation-token-source";
import OperationCanceledError from "../operation-canceled-error";

describe("CancellationTokenSource", () => {
  test(".token returns the same instance with each call", () => {
    const cts = new CancellationTokenSource();

    expect(cts.token).toBe(cts.token);
  });

  test(".isCancellationRequested is false before cancellation", () => {
    const cts = new CancellationTokenSource();

    expect(cts.isCancellationRequested).toBe(false);
  });

  test(".isCancellationRequested is true after cancellation", () => {
    const cts = new CancellationTokenSource();
    cts.cancel();

    expect(cts.isCancellationRequested).toBe(true);
  });
});

describe("CancellationToken", () => {
  test("token.isCancellationRequested is false after cancellation", () => {
    const cts = new CancellationTokenSource();
    cts.cancel();

    expect(cts.token.isCancellationRequested).toBe(true);
  });

  test("token.isCancellationRequested is true after cancellation", () => {
    const cts = new CancellationTokenSource();
    cts.cancel();

    expect(cts.token.isCancellationRequested).toBe(true);
  });

  test(".throwIfCancellationRequested() when not-canceled doesn't throw", () => {
    const cts = new CancellationTokenSource();

    cts.token.throwIfCancellationRequested();
  });

  test(".throwIfCancellationRequested() when canceled throws OperationCanceledError", () => {
    const cts = new CancellationTokenSource();
    cts.cancel();

    expect(() => cts.token.throwIfCancellationRequested()).toThrow(OperationCanceledError);
  });

  test("awaiting a canceled token throws OperationCanceledError", async () => {
    const cts = new CancellationTokenSource();
    cts.cancel();

    await expect(cts.token).rejects.toThrow(OperationCanceledError);
  });

  test(".race() resolves the passed in promises data when it completes", async () => {
    const cts = new CancellationTokenSource();
    const result = "hello world";

    expect(await cts.token.race(Promise.resolve(result))).toBe(result);
  });

  test(".race() throws OperationCanceledError when the token is canceled", async () => {
    const cts = new CancellationTokenSource();
    cts.cancel();

    await expect(cts.token.race(Promise.resolve())).rejects.toThrow(OperationCanceledError);
  });
});
