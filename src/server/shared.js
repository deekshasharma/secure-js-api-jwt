const jsonfile = require('jsonfile');
const users = './database/users.json';
const Constants = require('./constants');
const jwt = require('jsonwebtoken');


exports.getUserDetails = async function getUserDetails(userName) {
    const allUsers = await jsonfile.readFile(users);
    const filteredUserArray = allUsers.filter(user => (user.username === userName));
    return filteredUserArray.length === 0 ? {} : filteredUserArray[0];
};

exports.generateToken = (username, role) => {
    const payload = {data: username};
    const options = {
        algorithm: Constants.JWT_OPTIONS.ALGORITHM,
        expiresIn: Constants.JWT_OPTIONS.EXPIRY,
        issuer: Constants.JWT_OPTIONS.ISSUER,
        audience: role === "admin" ? Constants.JWT_OPTIONS.ADMIN_AUDIENCE : Constants.JWT_OPTIONS.MEMBER_AUDIENCE,
        subject: username
    };
    return jwt.sign(payload, Constants.JWT_OPTIONS.SECRET, options);
};