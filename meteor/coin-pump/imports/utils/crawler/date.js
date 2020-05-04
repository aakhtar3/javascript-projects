import { moment } from 'meteor/momentjs:moment';

function parseDate(date) {
  const est = moment(date);

  return {
    year: est.year(),
    month: est.month(),
    day: est.date(),
    hour: est.hour(),
    minute: est.minute(),
    // second: est.second(),
    // millisecond: est.millisecond(),
    date: `${est.month() + 1}-${est.date()}-${est.year()}`,
    time: `${est.hour()}:${est.minute()}`,
    timestamp: est.format()
  };
}

function addTimeStamp(c) {
  if (Object.keys(c).length > 8) {
    const timestamp = new Date();
    const date = parseDate(timestamp);
    return Object.assign(c, date);
  }
}

function getOldDate() {
  const d = new Date();
  // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
  let yesterday = d - (1000 * 60 * 60 * 24 * 2);
  yesterday = new Date(yesterday);
  return moment(yesterday).format();

}

module.exports = {
  parseDate: parseDate,
  addTimeStamp: addTimeStamp,
  getOldDate: getOldDate
};