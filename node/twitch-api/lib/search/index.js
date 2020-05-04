const maps = require('../functions/maps');
const filters = require('../functions/filters');


function gameResponse(req, data) {
    return {
        games: []
    }
}

function channelResponse(req, data) {
    const list = data
        .filter(filters.byType.bind(null, req.query.query))
        .map(maps.byChannel);

    return {
        channels: list
    }
}

function streamResponse(req, data) {
    const list = data
        .filter(filters.byType.bind(null, req.query.query))
        .map(maps.byStream);

    return {
        streams: list
    }
}

function searchById (req, data) {
    let response;
    if (req.params.id === 'games') {
        response = gameResponse(req, data)
    } else if (req.params.id === 'channels') {
        response = channelResponse(req, data)
    } else if (req.params.id === 'streams') {
        response = streamResponse(req, data)
    }
    return response;
}



module.exports = {
    searchById
};