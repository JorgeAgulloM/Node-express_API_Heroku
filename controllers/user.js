const fs = require("fs");
const path = require("path");

const bcrypts = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../services/jwt");


async function register(req, res) {
    const user = new User(req.body);

    try {
        if (!user.email) { msg: "El email es obligatorio" };
        if (!user.password) { msg: "La contraseña es obligatoria" };

        const foundEmail = await User.findOne({ email });
        if (foundEmail) throw { msg: "El email ya ha sido regitrado"};

        const salt = bcrypts.genSaltSync(10);
        user.password = await bcrypts.hash(user.password, salt);
        user.save();

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function login(req, res) {
    const { email, password } = req.boy;


    try {
        const user = await User.findOne({ email });
        if (!user) throw { msg: "Error en el email o contraseña" };

        const passwordSuccess = await bcrypts.compare(password, user.password);
        if (!passwordSuccess) throw { msg: "Error en el email o contraseña" };

        res.status(200).send({ token: jwt.createToken(user, "12h") });
    } catch (error) {
        res.status(500).send(error);
    }

}

function protected(req, res) {
    res.status(200).send({ msg: "Contendio del enpoint protegido"})
}

function uploadAvatar(req, res) {
    const params = req.params;

    User.findById({ _id: params.id }, (err, userData) => {
        if (err) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
            if (!userData) {
                res.status(500).send({ msg: "No se ha encontrado el usuario" });
            } else {
                let user = userData;

                if (req.files) {
                    const filePath = req.files.avatar.path;
                    const fileSplit = filePath.split("/");
                    const fileName = fileSplit[1];

                    const extSplit = fileName.split["."];
                    const fileExt = extSplit[1];

                    if (fileExt !== "png" && fileExt !== "jpg") {
                        res.status(400).send({ msg: "La extensión de la imagen no es válida. (Solo se admite .jpg y .png)" });
                    } else {
                        user.avatar = fileName;

                        User.findByIdAndUpdate({ _id: params.id }, user, (err, userResult) => {
                            if (err) {
                                res.status(500).send({ msg: "Error del servidor." });
                            } else {
                                if (!userResult) {
                                    res.status(404).send({ msg: "No se ha encontrado el usuario" });
                                } else {
                                    res.status(200).send({ msg: "Avatar actualizado."});
                                }
                            }
                        })
                    }
                }
            }
        }
    })
}

function getAvatar(req, res) {
    const { avatarName } = req.params;
    const filePath = `./uploads/${avatarName}`;

    fs.stat(filePath, (err, stat) => {
        if (err) {
            res.status(404).send({ msg: "El avatar no existe."});
        } else {
            res.sendFile(path.resolve(filePath));
        }
    })
}

module.exports = {
    register,
    login,
    protected,
    uploadAvatar,
    getAvatar
}