import React from 'react';
import sinon from 'sinon';
import { createMockStore } from 'redux-test-utils';
import shallowWithStore from '../../../mock/redux/shallowWithStore';
import { Graph, mapStateToProperties } from '../../../../src/components/Graph';

describe(`<Graph />`, () => {
  describe(`When calling Graphs`, () => {
    const mockStore = {
      eventReducer: {
        currentTime: new Date(),
        events: [],
      },
    };
    let spy;
    let response;
    let store;
    let component;
    let instance;
    let events;

    beforeEach(() => {
      store = createMockStore(mockStore);
      component = shallowWithStore(<Graph />, store);
      response = undefined;
      events = undefined;
    });

    afterEach(() => {
      spy && spy.restore();
    });

    describe(`When calling Graph`, () => {
      it(`Then it should be defined`, () => {
        expect(component).toBeDefined();
      });
    });

    describe(`When calling mapStateToProps`, () => {
      it(`Then it should map the state to properties`, () => {
        response = mapStateToProperties(mockStore);
        expect(response).toEqual(mockStore.eventReducer);
      });
    });

    describe(`When calling buildTimseries()`, () => {
      it(`Then it should return a response`, () => {
        events = [];
        instance = component.instance();
        response = instance.buildTimseries(events);
        expect(response).toBeDefined();
      });
    });

    describe(`When calling computeTimeRange()`, () => {
      it(`Then it should return a response`, () => {
        const time = new Date(1566189684230);
        instance = component.instance();
        response = instance.computeTimeRange(time);
        expect(response).toBeDefined();
      });
    });

    describe(`When calling styleNode()`, () => {
      it(`Then it should return a green style`, () => {
        instance = component.instance();
        response = instance.styleNode(`events`);
        expect(response.normal.fill).toEqual(`green`);
      });

      it(`Then it should return a red style`, () => {
        instance = component.instance();
        response = instance.styleNode(`alaerts`);
        expect(response.normal.fill).toEqual(`red`);
      });
    });
  });
});
