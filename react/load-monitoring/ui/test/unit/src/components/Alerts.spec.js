import sinon from 'sinon';
import { toast } from 'react-toastify';
import Alert from '../../../../src/components/Alert';

describe(`Alerts`, () => {
  describe(`When calling Alerts`, () => {
    let spy;

    afterEach(() => {
      spy && spy.restore();
    });

    it(`Then it should trigger the toast`, () => {
      spy = sinon.spy(toast, `error`);
      Alert(`error`, `message`);
      expect(spy.callCount).toEqual(1);
    });
  });
});
