var express = require('express');

var router = express.Router();

// Sign-in existing user
router.get('/profile', (req, res) => {
    res.json({ message: `Welcome ${req.user.email}!`})
});

module.exports = router;
