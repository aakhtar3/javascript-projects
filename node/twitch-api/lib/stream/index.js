const filters = require('../functions/filters');
const sorts = require('../functions/sorts');
const maps = require('../functions/maps');

function response(req, data) {
    let list;

    if (req.query.game) {
        list = data.filter(filters.games.bind(null, req.query.game));
    } else if (req.query.community_id) {
        list = data.filter(filters.communities.bind(null, req.query.community_id));
    } else {
        list = data.filter(filters.byUsers.bind(null, 50));
    }

    list = list
        .map(maps.byStream)
        .sort(sorts.byViewers);

    return {
        _total: list.length,
        streams: list
    };
}

module.exports = {
    response
};