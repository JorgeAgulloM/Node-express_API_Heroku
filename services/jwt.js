const jwt = require("jsonwebtoken");

const SECRET_KEY = "kie8395u5jfoc8s7akzncvbouw8e85405elmckvifu3i3hdnci"

function createToken(user, expiresIn) {
    const { id, email } = user;
    const payload = { id, email };

    return jwt.sign(payload, SECRET_KEY, { expiresIn} );
}

function decodeToken(token) {
    return jwt.decode(token, SECRET_KEY);
}

module.exports = {
    createToken,
    decodeToken
}