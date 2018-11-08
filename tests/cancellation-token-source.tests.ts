import CancellationTokenSource from "../src/cancellation-token-source";
import OperationCanceledError from "../src/operation-canceled-error";

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

  test(".throwIfCancellationRequested when not-cancelled doesn't throw", () => {
    const cts = new CancellationTokenSource();

    cts.token.throwIfCancellationRequested();
  });

  test(".throwIfCancellationRequested when cancelled throws OperationCanceledError", () => {
    const cts = new CancellationTokenSource();

    cts.cancel();

    expect(() => cts.token.throwIfCancellationRequested()).toThrow(OperationCanceledError);
  });
});
