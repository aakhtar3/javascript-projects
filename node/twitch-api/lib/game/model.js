function model(game, image, viewers, channels) {
    return {
        game: {
            name: game,
                popularity: viewers,
                _id: game,
                giantbomb_id: game,
                box: {
                large: image,
                    medium: image,
                    small: image,
                    template: image
            },
            logo: {
                large: image,
                medium: image,
                small: image,
                template: image
            },
            localized_name: game,
        },
        viewers: viewers,
        channels: channels
    }
}

module.exports = {
    model
};