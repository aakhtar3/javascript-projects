import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { History } from '../../startup/both/collections.js'

export const insertHistory = new ValidatedMethod({
  name: 'history.insert',
  validate: null,
  run(event) {
    const organizedHistory = {
      timestamp: event.timestamp,
      date: event.date,

      month: event.month + 1,
      day: event.day,
      year: event.year,

      hour: event.hour,
      minute: event.minute,

      time: event.time,

      ids: event.ids,
      entries: event.entries,
    };
    return History.insert(organizedHistory);
  },
});

export const getRecentHistory = new ValidatedMethod({
  name: 'history.getRecent',
  validate: null,
  run() {
    let query;
    const count = History.find().count() - 1;

    if(count <= 0 ) {
      query = History.findOne({});
    } else if (Meteor.isProduction) {
      query = History.findOne({}, {
        sort: {
          timestamp: -1
        },
        limit: 1
      })
    } else if (Meteor.isDevelopment) {
      query = History.findOne({}, {
        sort: {
          $natural: -1
        },
        limit: 1
      })
    }

    return query;
  }
});

export const getRecentHistoryLimit = new ValidatedMethod({
  name: 'history.getRecentLimit',
  validate: null,
  run({limit}) {
    const count = History.find().count() - limit;

    return History.find({}, {
        skip: count
      }
    );
  }
});

export const deleteHistory = new ValidatedMethod({
  name: 'history.deleteHistory',
  validate: null,
  run(timestamp) {
    return History.remove({"timestamp" : { $lt : timestamp} });
  }
});

// Get list of all method names on Lists
const LISTS_METHODS = _.pluck([
  insertHistory,
  getRecentHistory,
  getRecentHistoryLimit,
  deleteHistory
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
