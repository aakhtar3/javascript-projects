function totalViewers(data) {
    return data.reduce((total, o) => {

        if(total && total.views) {
            total = parseInt(total.views);
        }
        return total + parseInt(o.views)
    });
}

module.exports = {
    totalViewers
};