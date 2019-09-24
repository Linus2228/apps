const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define a model (here user model) - what particular properties we need
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, // each email will be converted to lowercase
    password: String
})

// on save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next) {
    // get access to user model
    const user = this; // user.email, user.password - specific user

    // generate a salt asynchronously, then run callback
    bcrypt.genSalt(10, function(error, salt) {
        if (error) {
            return next(error);
        }

        // hash/encrypt our password using salt
        bcrypt.hash(user.password, salt, null, function(error, hash) {
            if (error) {
                return next(error);
            }
            // overwrite plain text password with encrypted password
            user.password = hash;
            // ho ahead and save the model
            next(); 
        })
    })
})

// create the model Class
const ModelClass = mongoose.model('user', userSchema); // class of users, all users

// export the model
module.exports = ModelClass;