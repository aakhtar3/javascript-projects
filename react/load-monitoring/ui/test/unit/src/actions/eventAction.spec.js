import * as actionTypes from '../../../../src/constants/eventConstant';
import * as actions from '../../../../src/actions/eventAction';

describe(`Event Actions`, () => {
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
      expect(actions.addEvent(payload))
        .toEqual(expectedAction(actionTypes.ADD_EVENT));
    });
  });
});
