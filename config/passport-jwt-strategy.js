const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'rambharose'
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad.id, function(err, user){
        if (err){console.log('Error in finding customer from JWT'); return;}

        if (user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));

module.exports = passport;
