import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { History } from '../../startup/both/collections.js'

// Deny all client-side updates since we will be using methods to manage this collection
History.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

History.schema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  timestamp: { type: Date, label: 'timestamp' },

  year: { type: String},
  month: { type: String },
  day: { type: String},
  hour: { type: String},
  minute: { type: String},

  time: { type: String},
  date: { type: String},

  ids: { type: Array, regEx: SimpleSchema.RegEx.Id },
  'ids.$': { type: String },
  entries: { type: Number },
});

History.attachSchema(History.schema);

History.publicFields = {
  timestamp: 1,
  ids: 1,
  entries:1,
};