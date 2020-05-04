import { ADD_EVENT } from '../constants/eventConstant';

/**
 * Action to update add data state
 * @param {Object} newData
 * @returns {Object}
 */
export const addEvent = (newData) => ({
  type: ADD_EVENT,
  payload: newData,
});
