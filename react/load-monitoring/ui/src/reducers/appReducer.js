
import { IS_READY } from '../constants/appConstant';
import { appState } from './initState';

const appReducer = (state = appState, action) => {
  switch (action.type) {
  case IS_READY:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default appReducer;
