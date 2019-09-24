const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user'); // entire collection of users

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // convention that jwt have sub key (short from subject)
    // convention that jwt have iat key (issued at time)
    return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email or password' })
    }

    // see if a user with given email exists
    User.findOne({ email }, function (error, existingUser) {
        if (error) { // in data base connection down
            return next(error);
        }

        // if user does exists, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        // if user not exist, create and save user record
        const user = new User({
            email,
            password
        })
        user.save(function (error) {
            if (error) {
                return next(error);
            }

            // respond to request
            res.json({ token: tokenForUser(user) });
        })
    })



}