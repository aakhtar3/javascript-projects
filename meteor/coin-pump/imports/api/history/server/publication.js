import { Meteor } from 'meteor/meteor';
import { History } from '../../../startup/both/collections.js'

Meteor.publish('recent-history', function() {
  return History.find({}, {
    fields: History.publicFields,
    limit: 1,
    sort: {
        timestamp: -1
    }
  }
  );
});
