const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/users')

passport.use(new localStrategy({
    usernameField:'usuario',
    passwordField:'password'
},function(email,password,done){
    User.findOne({where:{usuario}}).then(function(user){
        if(!user || !user.validtePassword(password)){
            return done(null,false,{errors:{'email o contrasena':'equivocado'}})
        }
        return done(null,user)
    }).catch(done)
}))


module.exports = passport