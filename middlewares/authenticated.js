const moment = require("moment");
const jwt = require("../services/jwt");

const SECRET_KEY = "kie8395u5jfoc8s7akzncvbouw8e85405elmckvifu3i3hdnci";

function ensureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ msg: "La petición no tiene la cabecera de Autenticación"} );
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    const payload = jwt.decodeToken(token, SECRET_KEY);

    try {
        if (payload.exp <= moment().unix()) {
            return res.status(400).send({ msg: "El token ha expirado" });
        }
    } catch (error) {
        return res.status(400).send({ msg: "Token invalido"} );
    }

    req.user = payload;
    next();
}

module.exports = {
    ensureAuth
}