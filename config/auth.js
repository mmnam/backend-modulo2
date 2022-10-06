const secret = require('./secret')
const {expressjwt}  = require('express-jwt')

function getTokenFromHeader(req){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer'){
        return req.headers.authorization.split(' ')[1]
    }
}

const auth = {
    required:(req,res,next)=>{
        if(!req.auth || !req.auth.user){
            return res.sendStatus(401)
        }
        next()
    },
    isSeller:(req,res,next)=>{
        if(!req.auth){
            return res.sendStatus(401)
        }
        if(req.auth.rol!== 'seller'){
            return res.sendStatus(403)
        }
        next()}
    ,
    optional:expressjwt({
        secret: secret,
        algorithms:['HS256'],
        userProperty:'user',
        credentialsRequired:false,
        getToken:getTokenFromHeader
    })
}

module.exports = auth