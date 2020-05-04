function model(o) {
    return {
        _id: o.username,
        user_id: o.username,
        display_order: 1,
        kind: 'default',
        data: {
            link: `https://example.com/${o.username}`,
            image: o.logo,
            title: o.username,
            description: o.description,
        },
        html_description: '',
        channel: o.username
    }
}

module.exports = {
    model
};