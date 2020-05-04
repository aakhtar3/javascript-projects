function paginator(req, list) {
    let response;

    if(req.query.game || req.query.community_id) {
        response = list;
    } else {
        let offset = parseInt(req.query.offset);
        let limit = parseInt(req.query.limit);
        let reminder = parseInt(offset/limit);

        if (reminder === 1) {
            limit += limit
        } else if (reminder > 1) {
            limit += reminder * limit;
        }

        response = list.slice(offset, limit);
    }
    return response;
}

module.exports = {
    paginator
};