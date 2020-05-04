const ENUM = require('../utils/enums');

function byUsers(num, o) {
    return o.views >= num;
}

function games(filter, o) {
    return byUsers(50, o) && ENUM.MAP[o.section] === filter;
}

function communities(filter, o) {
    return byUsers(50, o) && o.tags.indexOf(filter) > -1;
}
function byType(filter, o) {
    return o.username.indexOf(filter) >= 0
}


module.exports = {
    byUsers, games, communities, byType
};