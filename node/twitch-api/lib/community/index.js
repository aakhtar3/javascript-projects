const community = require('./model');
const filters = require('../functions/filters');

function response(req, data) {
    let response;

    const tags = {};
    const list = [];
    const images = [];

    if (req.params.id === 'top') {
        data
            .filter(filters.byUsers.bind(null, 10))
            .forEach(o => {
                o.tags.forEach(tag => {
                    if(tags.hasOwnProperty(tag)) {
                        tags[tag].viewers += o.views;
                        tags[tag].channels++;


                        if (tags[tag].avatar_image_url !== o.logo || images.indexOf(o.logo) === -1) {
                            tags[tag].avatar_image_url = o.logo;
                            images.push(o.image_url);
                        } else {
                            tags[tag].avatar_image_url = '';
                        }
                    } else {
                        tags[tag] = {
                            _id: tag,
                            name: tag,
                            viewers: 1,
                            channels: 1,
                            avatar_image_url: o.logo
                        };
                        images.push(o.logo);
                    }
                });
        });

        for(let key in tags) {
            if(tags.hasOwnProperty(key) && tags[key].channels > 5) {
                list.push(tags[key]);
            }
        }

        response = {
            _total: list.length,
            _cursor: "",
            communities: list
        }
    } else {
        response = community.model(req.params.id);
    }

    return response;
}

module.exports = {
    response
};