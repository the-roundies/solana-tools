/**
 * Returns a promise that resolves after the provided number of milliseconds has elapsed.
 * Used for flow control in scripts, such as when you need to request the
 * requests-per-second limits of an API
 *
 * Usage:
 *
 * import delay from '@/utilities/delay';
 *
 * // waits 500 milliseconds:
 * await delay(500)
 *
 * @param time - milliseconds to wait before resolving the promise
 */
export default (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
