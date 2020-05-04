import { ADD_EVENT } from '../../../../src/constants/eventConstant';
import { eventReducer } from '../../../../src/reducers';
import { eventState } from '../../../../src/reducers/initState';

describe(`Event Reducer`, () => {
  describe(`When calling event reducer`, () => {
    it(`Then it should get default state`, () => {
      const action = {};
      const reducer = eventReducer(undefined, action);
      expect(reducer).toEqual(eventState);
    });

    it(`Then it should update state`, () => {
      const expected = { event: [] };
      const action = {
        type: ADD_EVENT,
        payload: expected,
      };
      const reducer = eventReducer({}, action);
      expect(reducer).toEqual(expected);
    });

  });
});
