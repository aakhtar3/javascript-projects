import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Coin } from '../../../startup/both/collections.js'

import './coin_history.html';
import './coin_history.css';

Template.coin_history.onCreated(function () {
  this.pagination = new Meteor.Pagination(Coin, {
    filters: {
      pair: this.data.pair,
      exchange: this.data.exchange
    },
    sort: {
      'timestamp': -1
    },
    // debug: true,
  });
});


Template.coin_history.helpers({
  coins: function () {
    return Template.instance().pagination.getPage();
  },
  isReady: function () {
    return Template.instance().pagination.ready();
  },
  templatePagination: function () {
    return Template.instance().pagination;
  },

  // optional helper used to return a callback that should be executed before changing the page
  clickEvent: function() {
    return function(e, templateInstance, clickedPage) {
      e.preventDefault();
    };
  },
  formatDate(d) {
    const dates = d.split('-');

    return `${dates[0]} - ${dates[1]}`;
  }
  ,
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
  formatPercent(n) {
    return n && n !== 0 ? n + '%' : '';
  },
  formatPercent1m(n) {
    return n && n !== 0 ? n + '%' : '-';
  },
  formatPolar(s) {
    let polar;
    if (s === 'pos') {
      polar = '+'
    } else if (s === 'neg') {
      polar = '-';
    }
    return polar;
  }
});
