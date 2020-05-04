import { IS_READY } from '../../../../src/constants/appConstant';
import { appReducer } from '../../../../src/reducers';
import { appState } from '../../../../src/reducers/initState';

describe(`App Reducer`, () => {
  describe(`When calling app reducer`, () => {
    it(`Then it should get default state`, () => {
      const action = {};
      const reducer = appReducer(undefined, action);
      expect(reducer).toEqual(appState);
    });

    it(`Then it should update state`, () => {
      const expected = { isReady: true };
      const action = {
        type: IS_READY,
        payload: expected,
      };
      const reducer = appReducer({}, action);
      expect(reducer).toEqual(expected);
    });
  });
});
