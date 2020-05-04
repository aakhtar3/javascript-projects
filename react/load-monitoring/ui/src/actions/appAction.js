import { IS_READY } from '../constants/appConstant';

/**
 * Action to update isReady state
 * @param {Boolean} isReady
 * @returns {Object}
 */
export const setIsReady = (isReady) => ({
  type: IS_READY,
  payload: isReady,
});
