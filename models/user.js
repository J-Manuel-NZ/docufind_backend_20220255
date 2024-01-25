var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        unique: false,
    },
    employeeID: {
        type: String,
        required: [false],
        unique: true,
    },
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
}, {collection: 'users'});

var User = mongoose.model('User', userSchema);
module.exports = User;