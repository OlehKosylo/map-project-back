module.exports = (page, limit) => {
    let offset = 0;
    if (page) {
        offset = limit * (page - 1);
    }
    return offset;
};
