import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Coin } from '../../startup/both/collections.js'

export const insertCoin = new ValidatedMethod({
  name: 'coin.insert',
  validate: null,
  run(coin) {
    let organizedCoin = {
      logs: coin.logs,
      // Time
      timestamp: coin.timestamp,
      time: coin.time,
      date: coin.date,

      // Coin Info
      coin: coin.coin,
      exchange: coin.exchange,
      symbol: coin.symbol,
      pair: coin.pair,
      tradingPairs: coin.tradingPairs,
      polarization: coin.polarization,

      // Metric
      '#': coin['#'],
      posScore: coin.posScore || 0,
      negScore: coin.negScore || 0,

      // Coin Value
      'vol%': coin['vol%'],
      vol24h: coin.vol24h,
      price: coin.price,

    };

    if (coin['<10m']) {
      organizedCoin['<10m'] = coin['<10m'];
    }

    // Winner
    if(coin['w1h#'] && coin.w1h) {
      organizedCoin['w1h#'] = coin['w1h#'];
      organizedCoin.w1h = coin.w1h;
    }

    if(coin['w24h#'] && coin.w24h) {
      organizedCoin['w24h#'] = coin['w24h#'];
      organizedCoin.w24h = coin.w24h;
    }

    if(coin['w7d#'] && coin.w7d) {
      organizedCoin['w7d#'] = coin['w7d#'];
      organizedCoin.w7d = coin.w7d;
    }

    // Loser
    if(coin['l1h#'] && coin.l1h) {
      organizedCoin['l1h#'] = coin['l1h#'];
      organizedCoin.l1h = coin.l1h;
    }

    if(coin['l24h#'] && coin.l24h) {
      organizedCoin['l24h#'] = coin['l24h#'];
      organizedCoin.l24h = coin.l24h;
    }

    if(coin['l7d#'] && coin.l7d) {
      organizedCoin['l7d#'] = coin['l7d#'];
      organizedCoin.l7d = coin.l7d;
    }

    return Coin.insert(organizedCoin);
  },
});

export const getCoins = new ValidatedMethod({
  name: 'coin.getCoins',
  validate: null, //new SimpleSchema({}).validator(),
  run(timestamp) {
    return Coin.find({timestamp: timestamp});
  },
});

export const getCoin = new ValidatedMethod({
  name: 'coin.getCoin',
  validate: null, //new SimpleSchema({}).validator(),
  run(id) {
    return Coin.findOne({_id: id});
  },
});

export const deleteCoins = new ValidatedMethod({
  name: 'coin.deleteCoins',
  validate: null,
  run(timestamp) {
    return Coin.remove({"timestamp" : { $lt : timestamp} });
  }
});

// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
  insertCoin,
  getCoins,
  getCoin,
  deleteCoins,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(LISTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
