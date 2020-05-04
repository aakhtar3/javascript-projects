import * as actionTypes from '../../../../src/constants/appConstant';
import * as actions from '../../../../src/actions/appAction';

describe(`App Actions`, () => {
  const payload = `payload`;
  let expectedAction;

  beforeEach(() => {
    expectedAction = (type) => ({
      type,
      payload,
    });
  });

  describe(`When setting state for isReady`, () => {
    it(`Then it should expect the action`, () => {
      expect(actions.setIsReady(payload))
        .toEqual(expectedAction(actionTypes.IS_READY));
    });
  });
});
