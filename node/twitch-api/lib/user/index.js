const filters = require('../functions/filters');
const sorts = require('../functions/sorts');
const maps = require('../functions/maps');

function response(req, data) {
    const list = data
        .filter(filters.byType.bind(null, req.query.login))
        .map(maps.byUser)
        .sort(sorts.byViewers);

    return {
        _total: list.length,
        users: list
    };
}

module.exports = {
    response
};