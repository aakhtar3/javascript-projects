import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProperties } from '../../../../src/components/App';

describe(`<App />`, () => {
  describe(`When calling App`, () => {
    const dispatch = () => null;

    describe(`When rendering component`, () => {
      it(`Then it should render <App />`, () => {
        const wrapper = shallow(<App dispatch={dispatch} />);
        expect(wrapper.find(`div`).length).toBe(1);
      });

      it(`Then it should render <App />`, () => {
        const isReady = true;
        const wrapper = shallow(<App dispatch={dispatch} isReady={isReady} />);
        expect(wrapper.find(`div`).length).toBe(0);
      });

      it(`Then it should update state`, () => {
        const state = {
          appReducer: {
            isReady: true,
          },
        };
        const mappedState = mapStateToProperties(state);
        const expectedState = { isReady: true };
        expect(mappedState).toEqual(expectedState);
      });
    });
  });
});
