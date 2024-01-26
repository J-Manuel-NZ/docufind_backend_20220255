var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require("../models/user.js")

const UserSchema = mongoose.model("User")
const User = require('../models/user');

var router = express.Router();

// Sign-in existing user 
router.post('/sign-in', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if the user exists
    const existingUser = await User.findOne({email: email})
    if (existingUser) {
        try {
            // const passwordCorrect = await bcrypt.compare(password, existingUser.password);
            let passwordCorrect = false;
            if (password == existingUser.password) {
                passwordCorrect = true;
            }
            console.log("Password Correct: " +passwordCorrect)
            if (passwordCorrect) {
                res.send({status: "User authenticated", data: existingUser});
                console.log('User logged in');
            } else {
                res.send({status: "Incorrect password"});
                console.log('Incorrect password');
            }
        } catch (error) {
            console.error('Error comparing passwords:', error);
        }
    } else {
        res.send({status: "User does not exist"});
        console.log('User does not exist');
    }
});


// check if user exists and if not then register new user
router.post('/register', async (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const admin = req.body.admin;

    // Check if the user exists
    const existingUser = await User.findOne({email: email})
    if (existingUser) {
        res.send({status: "User already exists"});
        console.log('User already exists');
    } else {
        try {
            console.log('Database connection state:', mongoose.connection.readyState);
            await UserSchema.create({name: name, employeeID: id, email: email, password: password, isAdmin: admin});
            res.send({status: "User does not exist, created new user"});
        } catch (error) {
            res.send({status: error});
        }
    }
});


module.exports = router;