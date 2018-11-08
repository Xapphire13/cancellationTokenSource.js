/**
 * @module cancellation-token-source
 */

import CancellationToken from "./cancellation-token";
import OperationCanceledError from "./operation-canceled-error";

/**
 * Creates and signals to a [[CancellationToken]] that it should be canceled
 */
export default class CancellationTokenSource {
  private _isCancellationRequested: boolean;
  private _token: CancellationToken;
  private promise: Promise<void>;
  private reject!: (reason: OperationCanceledError) => void;

  /**
   * Gets whether cancellation has been requested
   */
  public get isCancellationRequested(): boolean {
    return this._isCancellationRequested;
  }

  /**
   * Gets the [[CancellationToken]] bound to this [[CancellationTokenSource]]
   */
  public get token(): CancellationToken {
    return this._token;
  }

  constructor() {
    this._isCancellationRequested = false;
    this.promise = new Promise<void>((_res, reject) => {
      this.reject = reject;
    });
    this.promise.catch(() => {}); // Don't cause an unhandledrejection
    this._token = new CancellationToken(this, this.promise);
  }

  /**
   * Signal a request for cancellation
   */
  public cancel(): void {
    this._isCancellationRequested = true;
    this.reject(new OperationCanceledError());
  }

  /**
   * For use as a disposable
   * Cleans up resources created by this [[CancellationTokenSource]] and cancels its [[CancellationToken]]
   */
  public dispose(): void {
    this.cancel();
  }
}
