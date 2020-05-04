const ENUM = require('../utils/enums');
const channel = require('../channel/model');

function model(o, date) {
    return {
        _id: o.username,
        game: ENUM.MAP[o.section],
        viewers: o.viewers,
        video_height: 1080,
        average_fps: 60,
        delay: 0,
        created_at: date,
        is_playlist: true,
        stream_type: 'live',
        preview: {
            small: o.logo,
            medium: o.logo,
            large: o.logo,
            template: o.logo
        },
        channel: channel.model(o, date),
    }
}

module.exports = {
    model
};