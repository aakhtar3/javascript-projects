import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { publishPagination } from 'meteor/kurounin:pagination';

import { Coin } from '../../startup/both/collections.js'

// Deny all client-side updates since we will be using methods to manage this collection
Coin.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Coin.schema = new SimpleSchema({
  _id:          { type: String, regEx: SimpleSchema.RegEx.Id },

  logs:         { type: [String], label: 'logs' },

  timestamp:    { type: Date, label: 'timestamp' },
  time:         { type: String, label: 'time'},
  date:         { type: String, label: 'date' },

  coin:         { type: String, label: 'coin'},
  exchange:     { type: String, label: 'exchange'},
  symbol:       { type: String, label: 'symbol' },
  pair:         { type: String, label: 'pair' },
  tradingPairs: { type: [String], label: 'tradingPairs' },

  polarization: { type: String, label: 'polarization', allowedValues:['pos', 'neg', 'neu'] },

  '#':          { type: Number, label: 'rank'},
  posScore:     { type: Number, label: 'posScore', decimal: true},
  negScore:     { type: Number, label: 'negScore', decimal: true},

  'vol%':       { type: Number, label: 'volume %', decimal: true  },
  vol24h:       { type: Number, label: 'volume $'  },
  price:        { type: Number, label: 'price', decimal: true },

  '<10m':      { type: Number, label: '<10m', decimal: true, optional: true },

  'w1h#':       { type: Number, optional: true },
  w1h:          { type: Number, optional: true, decimal: true },
  'w24h#':      { type: Number, optional: true },
  w24h:         { type: Number, optional: true, decimal: true },
  'w7d#':       { type: Number, optional: true },
  w7d:          { type: Number, optional: true, decimal: true },

  'l1h#':       { type: Number, optional: true },
  l1h:          { type: Number, optional: true, decimal: true },
  'l24h#':      { type: Number, optional: true },
  l24h:         { type: Number, optional: true, decimal: true  },
  'l7d#':       { type: Number, optional: true },
  l7d:          { type: Number, optional: true, decimal: true  },

});

Coin.attachSchema(Coin.schema);
