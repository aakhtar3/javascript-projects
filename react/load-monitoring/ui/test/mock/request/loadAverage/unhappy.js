const unhappy = [{
  /**
   * Regular expression of URL
   */
  pattern: `http://localhost:3000/loadAverage`,

  /**
   * Returns the function
   */
  fixtures: () => {

  },

  /**
   * Throws an error
   */
  get: () => {
    throw new Error(`ERROR`);
  },
}];

export default unhappy;
