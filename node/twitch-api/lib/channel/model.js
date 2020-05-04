const ENUM = require('../utils/enums');

function model(o, date) {
    return {
        mature: false,
        partner: false,
        status: o.room_subject,
        broadcaster_language: 'en',
        language: "en",
        display_name: o.username,
        game: ENUM.MAP[o.section],
        _id: o.username,
        name: o.username,
        created_at: date,
        updated_at: date,
        delay: null,
        logo: '',
        banner: '',
        video_banner: '',
        background: '',
        profile_banner: '',
        profile_banner_background_color: '',
        url: `https://example.com/${o.username}`,
        views: o.views,
        followers: o.followers,
    }
}

module.exports = {
    model
};