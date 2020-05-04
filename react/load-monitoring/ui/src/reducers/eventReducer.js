
import { ADD_EVENT } from '../constants/eventConstant';
import { eventState } from './initState';

/**
 * Reducer to update the event state.
 */
const eventReducer = (state = eventState, action) => {
  switch (action.type) {
  case ADD_EVENT:
    // Force the array to only have 60 elements.
    if (state && state.events && state.events.length > 60) {
      state.events.shift();
    }
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default eventReducer;
