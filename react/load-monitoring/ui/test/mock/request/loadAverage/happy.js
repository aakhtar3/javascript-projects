const happy = [{
  /**
   * Regular expression of URL
   */
  pattern: `http://localhost:3000/loadAverage`,

  /**
   * Returns the data
   */
  fixtures: () => {
    const response = {
      averageLoad: 0.123456789,
      timeStamp: 1566189684230,
    };
    return response;
  },

  /**
   * Returns the result of the GET request
   *
   * @param match array Result of the resolution of the regular expression
   * @param data  mixed Data returns by `fixtures` attribute
   */
  get: (match, data) => {
    const response = {
      body: data,
    };
    return response;
  },
}];

export default happy;
