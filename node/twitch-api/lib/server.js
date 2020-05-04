const app = require('express')();
const cb = require('./controller');

const api = require('./api');

// Gets streams could have query params
app.get('/kraken/streams', headers, cb.streams);
app.get('/kraken/streams/:id', cb.streamByChannelId);
// Games
app.get('/kraken/games/:id', headers, cb.gamesTop);
// Communities
app.get('/kraken/communities/:id', headers, cb.communities);
// Search
app.get('/kraken/search/:id', headers, cb.search);
// Channel
app.get('/kraken/channels', headers, cb.channel);
app.get('/kraken/channels/:id', headers, cb.channel);
app.get('/api/channels/:id/panels', headers, cb.pannel);
//Team
app.get('/kraken/teams', headers, cb.channel);
app.get('/kraken/teams/:id', headers, cb.channel);
// User
app.get('/kraken/users/', headers, cb.users);

app.get(`/data`, headers, cb.data);

function headers(req, res, next) {
    req.headers['client-id'] === 'token'
        ? next()
        : res.status(401).send({ error: 'Sorry' })
}

app.listen(3000, () => console.log('App listening on port 3000!'));