var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Timestamp } = require('mongodb');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: {
       type: String,
       required: [true, "Please provide a password"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});


var Document = mongoose.model('User', userSchema);
module.exports = User;