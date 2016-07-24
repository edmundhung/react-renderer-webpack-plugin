/**
 * Creates a Static store that holds the state tree with no way to change the data
 *
 * @param [initialState] The initial state
 * @returns {Store} A Static store that lets you read the state only
 */
export default function createStore(initialState) {
  if (initialState !== Object(initialState)) {
    throw new Error('Expected the initialState to be an object.');
  }

  const staticState = initialState;

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The static state tree of your application.
   */
  function getState() {
    return staticState;
  }

  return {
    getState,
  };
}
