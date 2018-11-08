/**
 * @module cancellation-token-source
 */

import CancellationTokenSource from "./cancellation-token-source";
import OperationCanceledError from "./operation-canceled-error";

/**
 * Used to signal that an operation should be canceled
 */
export default class CancellationToken implements PromiseLike<void> {
  private source: CancellationTokenSource;
  private promise: Promise<void>;

  /**
   * Gets whether cancellation has been requested for this token
   */
  public get isCancellationRequested(): boolean {
    return this.source.isCancellationRequested;
  }

  constructor(source: CancellationTokenSource, promise: Promise<void>) {
    this.source = source;
    this.promise = promise;
  }

  /**
   * Throws an [[OperationCanceledError]] if cancellation has been requested for this token
   */
  public throwIfCancellationRequested(): void {
    if (this.isCancellationRequested) {
      throw new OperationCanceledError();
    }
  }

  /**
   * Races this token against the given promise. If cancellation is requested before the
   * promise completes, then an [[OperationCanceledError]] will be thrown.
   *
   * @return The results from the given promise
   */
  public async race<T>(promise: Promise<T>): Promise<T> {
    await Promise.race([this.promise, promise]);
    return promise;
  }

  /**
   * See [.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) in the Promise API
   */
  public then(
    onfulfilled?: ((value: void) => any | PromiseLike<any>) | null | undefined,
    onrejected?: ((reason: any) => any | PromiseLike<any>) | null | undefined): PromiseLike<any> {
    return this.promise.then(onfulfilled, onrejected);
  }
}
