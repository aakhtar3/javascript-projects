function byViewers(a, b) {
    if (a.viewers < b.viewers)
        return 1;
    if (a.viewers > b.viewers)
        return -1;
    return 0;
}

module.exports = {
    byViewers
};