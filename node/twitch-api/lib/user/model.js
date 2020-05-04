function model(o, date) {
    return {
        display_name: o.username,
        _id: o.username,
        name: o.username,
        type: 'user',
        bio: o.bio,
        created_at: date,
        updated_at: date,
        logo: o.logo
    }
}

module.exports = {
    model
};