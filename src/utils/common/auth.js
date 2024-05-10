const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { serverConfig } = require('../../config');

function checkPassword(plainPassword, encryptedPassword) {

    return bcrypt.compareSync(plainPassword, encryptedPassword);

}

function generateToken(input) {
    return jwt.sign(input, serverConfig.JWT_SECRET, { expiresIn: serverConfig.JWT_EXPIRY });
}

function verifyToken(token) {
    return jwt.verify(token, serverConfig.JWT_SECRET);
}

module.exports = {
    checkPassword,
    generateToken,
    verifyToken
}