const ENUM = require('../utils/enums');
const game = require('./model');

function response(streams) {
    const top = [];

    ENUM.LIST.forEach(section => {
        let viewers = 0;
        let channels = 0;
        let image = undefined;

        streams.forEach(stream => {
            if (ENUM.MAP[stream.section] === section) {
                viewers += stream.views;
                channels++;
                if (!image){
                    image = stream.image_url
                }
            }
        });
        top.push(game.model(section, image, viewers, channels));
        image = undefined;

        if (top.length === ENUM.LIST.length) {
            return false;
        }
    });

    return {
        _total: top.length,
        top: top,
    };
}

module.exports = {
    response
};