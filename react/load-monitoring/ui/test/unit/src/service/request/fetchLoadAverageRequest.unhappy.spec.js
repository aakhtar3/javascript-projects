import superagent from 'superagent';
import mockSuperAgent from 'superagent-mock';
import fetchLoadAverageRequest from '../../../../../src/service/request/fetchLoadAverageRequest';
import loadAverage from '../../../../mock/request/loadAverage';

describe(`When calling fetchLoadAverageRequest - UnHappy`, () => {
  let superAgentMock;

  beforeEach(() => {
    superAgentMock = mockSuperAgent(superagent, loadAverage.unhappy);
  });

  afterEach(() => {
    superAgentMock.unset();
  });

  describe(`When calling fetchLoadAverageRequest`, () => {
    it(`Then it should throw an error`, async () => {
      try {
        await fetchLoadAverageRequest();
      } catch (err) {
        expect(err.message).toEqual(`ERROR`);
      }
    });
  });
});
