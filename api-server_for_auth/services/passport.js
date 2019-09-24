const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// authentication layer to pass protected routes - we check whether user is logged in or not

// setup options for JWT strategy
const jwtOptions = {
    // where to look to find jwt
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // payload - decoded jwt (user id and timestamp)
    // done - callback depending on whether or not we are able successfuly authenticate the user

    // see if the user id in the payload exists in our data base
    // if does, call done with that user
    // otherwise, call done without a user object
    User.findById(payload.sub, function (error, user) {
        if (error) {
            return done(error, false);
        }

        if (user) {
            return done(null, user);
        } else {
            done(null, false);
        }
    })
})

// tell passport to use this strategy
passport.use(jwtLogin);