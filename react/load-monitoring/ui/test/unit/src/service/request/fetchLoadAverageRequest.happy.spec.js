import superagent from 'superagent';
import mockSuperAgent from 'superagent-mock';
import fetchLoadAverageRequest from '../../../../../src/service/request/fetchLoadAverageRequest';
import loadAverage from '../../../../mock/request/loadAverage';

describe(`When calling fetchLoadAverageRequest - Happy`, () => {
  let response;
  let superAgentMock;

  beforeEach(() => {
    response = undefined;
    superAgentMock = mockSuperAgent(superagent, loadAverage.happy);
  });

  afterEach(() => {
    superAgentMock.unset();
  });

  describe(`When calling fetchLoadAverageRequest`, () => {
    it(`Then it should return a sucessful response`, async () => {
      response = await fetchLoadAverageRequest();
      expect(response.body.averageLoad).toEqual(0.123456789);
      expect(response.body.timeStamp).toEqual(1566189684230);
    });
  });
});
