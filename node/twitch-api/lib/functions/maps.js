const stream = require('../stream/model');
const channel = require('../channel/model');
const user = require('../user/model');
const pannel = require('../pannel/model');
const date = require('../utils/dateCreator').creator;

function byStream(o) {
  return stream.model(o, date(o));
}

function byChannel(o) {
    return channel.model(o, date(o));
}
function byUser(o) {
    return user.model(o, date(o));
}

function byPannel(o) {
    return pannel.model(o)
}

function bytopFeatured(o) {
    return {
        stream: stream.model(o, date(o)),
        image: o.logo,
        priority: 10,
        scheduled: true,
        sponsored: false,
        text: o.text,
        title: o.title
    };
}

module.exports = {
  byStream, byUser, byPannel, byChannel, bytopFeatured
};