// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const { ServerConfig } = require('../../config');

// function checkPassword(plainPassword, encryptedPassword) {

//     return bcrypt.compareSync(plainPassword, encryptedPassword);

// }

// function generateToken(input) {
//     return jwt.sign(input, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY });
// }

// function verifyToken(token) {
//     return jwt.verify(token, ServerConfig.JWT_SECRET);
// }

// module.exports = {
//     checkPassword,
//     generateToken,
//     verifyToken
// }