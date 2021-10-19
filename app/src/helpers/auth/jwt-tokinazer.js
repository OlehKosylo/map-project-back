const jwt = require('jsonwebtoken');

const { jwtSecrets } = require('../../config');

module.exports = () => {
    const access_token = jwt.sign({}, jwtSecrets.JWT_SECRET, { expiresIn: '60m' });
    const refresh_token = jwt.sign({}, jwtSecrets.JWT_REFRESH_SECRET, { expiresIn: '3h' });

    return { access_token, refresh_token };
};
