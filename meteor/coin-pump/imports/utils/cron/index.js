import { SyncedCron } from 'meteor/percolate:synced-cron';

const Crawler = require('../crawler');

SyncedCron.add({
  name: 'Gathering Coin Data',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 1 minute');
  },
  job: function() {
    try {
      return Crawler.coinData();
    } catch(e) {
      console.log(e);
    }
  }
});


SyncedCron.add({
  name: 'Deleting Old Date',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('at 3:00 am');
  },
  job: function() {
    try {
      return Crawler.removeOldData();
    } catch(e) {
      console.log(e);
    }
  }
});

SyncedCron.start();
