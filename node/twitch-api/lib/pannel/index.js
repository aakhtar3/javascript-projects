const filters = require('../functions/filters');
const maps = require('../functions/maps');

function response (req, data) {
    const list = data
        .filter(filters.byType.bind(null, req.params.id))
        .map(maps.byPannel);

    return {
        list
    };
}

module.exports = {
    response
};