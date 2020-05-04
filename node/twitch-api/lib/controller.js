const cache = require('./cache');

function streams(req, res, next) {
    return cache.getStreamCache(req)
        .then(streams => {
            res.send(streams);
        }).catch(error => {
            res.send(error);
        })
}

function streamByChannelId(req, res, next){
    return cache.getChannelCache(req)
        .then(streams => {
            res.send(streams);
        }).catch(error => {
            res.send(error);
        })
}

function gamesTop(req, res, next) {
    return cache.getGameCache(req)
        .then(streams => {
            res.send(streams);
        }).catch(error => {
            res.send(error);
        })
}

function communities(req, res, next) {
    return cache.getCommunityCache(req)
        .then(streams => {
            res.send(streams);
        }).catch(error => {
            res.send(error);
        })
}

function search(req, res, next) {
    return cache.getSearchCahce(req)
        .then(streams => {
            res.send(streams);
        }).catch(error => {
            res.send(error);
        })
}

function channel(req, res, next) {
    return cache.getSearchCahce(req)
        .then(streams => {
            res.send(streams);
        }).catch(error => {
            res.send(error);
        })
}

function users(req, res, next) {
    return cache.getUserCache(req)
        .then(streams => {
            res.send(streams);
        }).catch(error => {
            res.send(error);
        })
}

function pannel(req, res, next) {
    return cache.getPannelCache(req)
        .then(streams => {
            res.send(streams);
        }).catch(error => {
            res.send(error);
        })
}

function data(req, res, next) {
    return cache.getData(true)
        .then(streams => {
            res.send(streams);
        }).catch(error => {
            res.send(error);
        })
}

module.exports = {
    streams, streamByChannelId, gamesTop, communities, search, channel, users, pannel, data
};
