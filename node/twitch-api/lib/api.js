const rp = require('request-promise');

const api = {
    uri: '',
    transform: function (body) {
        return JSON.parse(body);
    },
    headers: {
        connection: 'keep-alive'
    }
};

function caller (){
    return rp(api)
}

module.exports = {
    caller
};