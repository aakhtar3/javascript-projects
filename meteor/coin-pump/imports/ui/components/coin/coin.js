import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './coin.html';
import './coin.css';

Template.coin.helpers({
  formatCurrency(n) {
    let currency = (n).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return currency;
  },
  formatCurrencyVol(n) {
    let currency = (n).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }).split('.');

    return currency[0];
  },
  formatPercentFull(n) {
    return n && n !== 0 ? n + '%' : '';
  },
  formatPercent(n) {
    n = parseInt(n);
    return n && n !== 0 ? n + '%' : '';
  },
  isGreaterThanZero(c) {
    const n = c['<10m'];
    return n && n > 0
  },
  isLessThanZero(c) {
    const n = c['<10m'];
    return n && n < 0
  },
  isNewCoin(c) {
    const n = c['<10m'];
    return !n ? 'new ' : '';
  }
});
