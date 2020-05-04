import Request from 'superagent';

/**
 * Gets the load average from the API.
 */
const fetchLoadAverageRequest = () => Request
  .get(`http://localhost:3000/loadAverage`)
  .set({
    Accept: `application/json`,
  });

export default fetchLoadAverageRequest;
