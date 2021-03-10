const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'rambharose'
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function(err, customer){
        if (err){console.log('Error in finding customer from JWT'); return;}

        if (customer){
            return done(null, customer);
        }else{
            return done(null, false);
        }
    })
}));

module.exports = passport;
