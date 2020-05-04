import React from 'react';
import sinon from 'sinon';
import { createMockStore } from 'redux-test-utils';
import superagent from 'superagent';
import mockSuperAgent from 'superagent-mock';
import { toast } from 'react-toastify';
import { TimeSeries, mapStateToProperties } from '../../../../src/components/TimeSeries';
import shallowWithStore from '../../../mock/redux/shallowWithStore';
import loadAverage from '../../../mock/request/loadAverage';

describe(`<TimeSeries />`, () => {
  let superAgentMock;
  let response;
  let events;
  let hasAlertThreshHold;
  let store;
  let component;
  let instance;
  let spy;
  const mockStore = {
    eventReducer: {
      currentTime: new Date(),
      events: [],
      hasAlertThreshHold: false,
    },
  };

  const mockSingleEvent = [
    [`2019-08-19T04:55:00.255Z`, 0.1, -0.9],
  ];

  const mockDataThatWillTriggerAnAlert = [
    [`2019-08-19T04:55:00.255Z`, 0.1, -0.9],
    [`2019-08-19T05:05:00.255Z`, 0.1, -0.9],
    [`2019-08-19T05:15:00.255Z`, 0.2, -0.9],
    [`2019-08-19T05:25:00.255Z`, 1.5, -0.9],
    [`2019-08-19T05:35:00.255Z`, 1.5, -0.9],
    [`2019-08-19T05:45:00.255Z`, 1.5, -0.9],
    [`2019-08-19T05:55:00.255Z`, 1.8, -0.9],
    [`2019-08-19T06:05:00.255Z`, 2.0, -0.9],
    [`2019-08-19T06:15:00.255Z`, 2.0, -0.9],
    [`2019-08-19T06:25:00.255Z`, 2.0, -0.9],
    [`2019-08-19T06:35:00.255Z`, 2.0, -0.9],
    [`2019-08-19T06:45:00.255Z`, 2.0, -0.9],
    [`2019-08-19T06:55:00.255Z`, 2.0, -0.9],
  ];

  const mockDataThatWillRestore = [
    [`2019-08-19T04:55:00.255Z`, 0.1, -0.9],
    [`2019-08-19T05:05:00.255Z`, 0.1, -0.9],
    [`2019-08-19T05:15:00.255Z`, 0.2, -0.9],
    [`2019-08-19T05:25:00.255Z`, 0.1, -0.9],
    [`2019-08-19T05:35:00.255Z`, 0.1, -0.9],
    [`2019-08-19T05:45:00.255Z`, 0.1, -0.9],
    [`2019-08-19T05:55:00.255Z`, 0.1, -0.9],
    [`2019-08-19T06:05:00.255Z`, 0.1, -0.9],
    [`2019-08-19T06:15:00.255Z`, 0.1, -0.9],
    [`2019-08-19T06:25:00.255Z`, 0.1, -0.9],
    [`2019-08-19T06:35:00.255Z`, 0.1, -0.9],
    [`2019-08-19T06:45:00.255Z`, 0.1, -0.9],
    [`2019-08-19T06:55:00.255Z`, 0.1, -0.9],
  ];

  beforeEach(() => {
    superAgentMock = mockSuperAgent(superagent, loadAverage.happy);
    store = createMockStore(mockStore);
    component = shallowWithStore(<TimeSeries />, store);
    response = undefined;
    events = undefined;
    hasAlertThreshHold = undefined;
  });

  afterEach(() => {
    superAgentMock.unset();
    spy && spy.restore();
  });

  describe(`When calling TimeSeries`, () => {
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

  describe(`When calling fetchData()`, () => {
    it(`Then it should return a response`, async () => {
      instance = component.instance();
      response = await instance.fetchData();
      expect(response.averageLoad).toEqual(0.123456789);
      expect(response.timeStamp).toEqual(1566189684230);
    });
  });

  describe(`When calling pullData()`, () => {
    it(`Then it should return a update state twice`, async () => {
      const dispatchSpy = sinon.spy();
      events = mockSingleEvent;
      component = shallowWithStore(
        <TimeSeries events={events} dispatch={dispatchSpy} hasAlertThreshHold={false} />,
        store,
      );
      instance = component.instance();
      await instance.pullData();
      expect(dispatchSpy.callCount).toEqual(2);
    });
  });

  describe(`When calling checkAlertThreshHold()`, () => {
    it(`Then it should trigger an alert`, () => {
      spy = sinon.spy(toast, `error`);

      events = mockDataThatWillTriggerAnAlert;
      hasAlertThreshHold = false;

      instance = component.instance();
      instance.checkAlertThreshHold(events, hasAlertThreshHold);

      expect(spy.callCount).toEqual(1);
    });

    it(`Then it should trigger not trigger error`, () => {
      spy = sinon.spy(toast, `error`);
      events = mockDataThatWillTriggerAnAlert;
      hasAlertThreshHold = true;

      instance = component.instance();
      response = instance.checkAlertThreshHold(events, hasAlertThreshHold);

      expect(response).toEqual(true);
      expect(spy.callCount).toEqual(0);
    });

    it(`Then it should recover to normal`, () => {
      spy = sinon.spy(toast, `success`);

      events = mockDataThatWillRestore;
      hasAlertThreshHold = true;

      instance = component.instance();
      instance.checkAlertThreshHold(events, hasAlertThreshHold);

      expect(spy.callCount).toEqual(1);
    });

    it(`Then it should return false`, () => {
      events = mockSingleEvent;
      hasAlertThreshHold = false;

      instance = component.instance();
      response = instance.checkAlertThreshHold(events, hasAlertThreshHold);

      expect(response).toEqual(false);
    });
  });
});
