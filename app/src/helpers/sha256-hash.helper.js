const crypto = require('crypto');

const { enum: { hardWords: { hashAlgorithm, hashFormat } } } = require('../constants');

module.exports = (string) => crypto.createHash(hashAlgorithm).update(string).digest(hashFormat);
