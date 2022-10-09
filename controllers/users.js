const User = require('../models/users');


async function signUp(req, res) {
    const body = req.body;
    try { 
        const user = await User.create(body);
        const {salt, hash} = User.createPassword(body['password']);
        user.password_salt = salt;
        user.password_hash = hash;
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name) ) {
            return res.status(400).json({
                error: err.errors.map(e => e.message)
            })
        }
        else {
            throw err;
        }
    }
}

async function logIn(req, res) {
    if (Object.keys(req.body).length == 0) {
        res.status(400).json({error: "null data"});
    } else{
        const body = req.body;
        const user = await User.findOne({where: {usuario: body['usuario']}});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        if (User.validatePassword(body['password'], user.password_salt, user.password_hash)) {
            return res.status(200).json({user: "Bienvenido!",
            email:user.usuario,
            email:user.email,
            token:User.generateJWT(user)
        
        });
        } else {
            return res.status(400).json({mensaje: "Password Incorrecto"});
        }
    }
}

module.exports = { signUp, logIn }