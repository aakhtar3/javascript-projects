const moment = require('moment');

function creator(o) {
    return moment(new Date()).subtract(o.seconds_online, 'seconds').toDate();
}

module.exports = {
    creator
};