const maps = require('./maps');

function findById(id, data) {
    return data.find(o  => {
        if (id === o.username) {
            return maps.byStream(o)
        }
    });
}

module.exports = {
    findById
};