const NodeCache = require( "node-cache" );
const api = require('./api');
const myCache = new NodeCache({stdTTL: 60});

const channel = require('./channel');
const stream = require('./stream');
const game = require('./game');
const community = require('./community');
const search = require('./search');

const user = require('./user');
const pannel = require('./pannel');

const channelIds = {
    summary: 'summary',
    featured: 'featured'
};

const streamIds = {
    game: [],
    community: []
};

const gameIds = {
    top: 'game-top',
};

const communityIds = {
    top: 'community-top'
};

const searchIds = {
  games: 'games',
  channels: 'channels',
  streams: 'streams'
};

function getData(fresh) {
    return new Promise((resolve, reject) => {
        const data = myCache.get( "data" );
        if (data) {
            resolve(data);
        } else {
            api.caller(fresh)
                .then(res => {
                    myCache.set( "data", res );
                    resolve(res);
                }).catch(e => {
                    reject(e);
            })
        }
    })
}

function getChannelCache(req) {
    return new Promise((resolve, reject) => {
        const key = req && req.params && req.params.id && streamIds.hasOwnProperty(req.params.id)
            ? channelIds[req.params.id]
            : req.params.id;

        const data = myCache.get(key);

        if (data) {
            resolve(data);
        } else {
            getData()
                .then(channel.response.bind(null, req))
                .then(res => {
                    myCache.set(key, res);
                    resolve(res);
                }).catch(e => {
                reject(e);
            })
        }
    })
}

function getStreamCache(req) {
    return new Promise((resolve, reject) => {
        let data;
        let key;
        if(req && req.query && req.query.game) {
            key = req.query.game;
            if (streamIds.game.indexOf(req.query.game) > -1) {
                data = myCache.get(key);
            } else {
                streamIds.game.push(req.query.game);
            }
        } else if (req && req.query && req.query.community_id ) {
            key = req.query.community_id;
            if (streamIds.community.indexOf(req.query.community_id) > -1) {
                data = myCache.get(key);
            } else {
                streamIds.community.push(req.query.community_id);
            }
        } else {
            key = 'sorted';
            data = myCache.get(key);
        }

        if (data) {
            resolve(data);
        } else {
            getData()
                .then(stream.response.bind(null, req))
                .then(res => {
                    myCache.set(key, res);
                    resolve(res);
                }).catch(e => {
                reject(e);
            })
        }
    })
}

function getGameCache(req) {
    return new Promise((resolve, reject) => {
        const key = req && req.params && req.params.id && gameIds.hasOwnProperty(req.params.id)
            ? gameIds[req.params.id]
            : req.params.id;

        const data = myCache.get(key);

        if (data) {
            resolve(data);
        } else {
            getData()
                .then(game.response)
                .then(res => {
                    myCache.set(key, res);
                    resolve(res);
                }).catch(e => {
                reject(e);
            })
        }
    })
}

function getCommunityCache(req) {
    return new Promise((resolve, reject) => {
        const key = req && req.params && req.params.id && communityIds.hasOwnProperty(req.params.id)
            ? communityIds[req.params.id]
            : req.params.id;

        const data = myCache.get(key);

        if (data) {
            resolve(data);
        } else {
            getData()
                .then(community.response.bind(null, req))
                .then(res => {
                    myCache.set(key, res);
                    resolve(res);
                }).catch(e => {
                reject(e);
            })
        }
    })
}

function getSearchCahce(req) {
    return new Promise((resolve, reject) => {
        let key = `search`;
        const type = `-${req && req.params && req.params && req.params.id  && searchIds.hasOwnProperty(req.params.id) && req.params.id || ''}`;
        const query = `-${req && req.query && req.query && req.query.query || ''}`;
        key = key + type + query;
        const data = myCache.get(key);

        if (data) {
            resolve(data);
        } else {
            getData()
                .then(search.searchById.bind(null, req))
                .then(res => {
                    myCache.set(key, res);
                    resolve(res);
                }).catch(e => {
                reject(e);
            })
        }
    })
}

function getUserCache(req) {
    return new Promise((resolve, reject) => {
        const key = `user-${req && req.query && req.query.login || ''}`;

        const data = myCache.get(key);

        if (data) {
            resolve(data);
        } else {
            getData()
                .then(user.response.bind(null, req))
                .then(res => {
                    myCache.set(key, res);
                    resolve(res);
                }).catch(e => {
                reject(e);
            })
        }
    })
}

function getPannelCache(req) {
    return new Promise((resolve, reject) => {
        const key = `pannel-${req && req.params && req.params.id || ''}`;

        const data = myCache.get(key);

        if (data) {
            resolve(data);
        } else {
            getData()
                .then(pannel.response.bind(null, req))
                .then(res => {
                    myCache.set(key, res);
                    resolve(res);
                }).catch(e => {
                reject(e);
            })
        }
    })
}

module.exports = {
    getData, getChannelCache, getStreamCache, getGameCache, getCommunityCache, getSearchCahce, getUserCache, getPannelCache
};
