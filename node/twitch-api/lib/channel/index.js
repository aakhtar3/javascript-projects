
const pagination = require('../utils/pagination');
const filters = require('../functions/filters');
const sorts = require('../functions/sorts');
const maps = require('../functions/maps');
const reducers = require('../functions/reducers');
const finds = require('../functions/finds');

function getSummary(data) {
    return {
        channels: data.length,
        viewers: reducers.totalViewers(data),
    }
}

function getFeatured(req, data) {
    const list = data
        .filter(filters.byUsers.bind(null, 1000))
        .map(maps.bytopFeatured)
        .sort(sorts.byViewers);

    return {
        featured: pagination.paginator(req, list)
    };
}

function getChannel(req, data) {
    return finds.findById(req.params.id, data);
}

function response (req, data) {
    let repsonse;

    if (req.params.id === "summary") {
        repsonse =  getSummary(data);
    } else if (req.params.id === "featured") {
        repsonse = getFeatured(req, data);
    } else {
        repsonse = getChannel(req, data);
    }

    return repsonse;
}

module.exports = {
    response
};