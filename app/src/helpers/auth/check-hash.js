const bcrypt = require('bcrypt');

module.exports = (hashedPassword, password) => bcrypt.compare(password, hashedPassword);
