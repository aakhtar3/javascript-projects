import { Meteor } from 'meteor/meteor';

import { Coin } from '../../../startup/both/collections.js'

import { publishPagination } from 'meteor/kurounin:pagination';

publishPagination(Coin);

Meteor.publish('latest-coins', (id) => {
  return Coin.find({"_id": id});
});
