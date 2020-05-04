function model(id) {
    return {
        _id: id,
        owner_id: id,
        name: id,
        display_name: id,
        summary: '',
        description: '',
        description_html: '',
        rules: '',
        rules_html: '',
        language: 'EN',
        avatar_image_url: '',
        avatar_image_template: '',
        cover_image_url: '',
        cover_image_template: ''
    }
}

module.exports = {
    model
};
