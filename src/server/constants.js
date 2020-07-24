module.exports.JWT_OPTIONS = {
    MEMBER_AUDIENCE: ['SHOW_FAVORITE', 'LOGOUT', 'LOGIN', 'SHOW_BOOKS'],
    ADMIN_AUDIENCE: ['SHOW_FAVORITE', 'LOGOUT', 'LOGIN', 'SHOW_BOOKS', 'ADD_BOOK', 'SHOW_USERS'],
    ISSUER: "BOOKIE_ORG",
    EXPIRY: "1h",
    ALGORITHM: "HS256",
    SECRET: ")x2f-l-opsnd)w!!z2m7ykvony99pt@6@6m+=q2uk3%w8*7$ow"
};

module.exports.SHOW_BOOKS = "SHOW_BOOKS";
module.exports.SHOW_FAVORITE = "SHOW_FAVORITE";
module.exports.LOGOUT = "LOGOUT";
module.exports.LOGIN = "LOGIN";
module.exports.ADD_BOOK = "ADD_BOOK";
module.exports.SHOW_USERS = "SHOW_USERS";