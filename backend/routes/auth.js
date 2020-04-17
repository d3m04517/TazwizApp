const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').post((req,res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json('Please enter all fields.');
    }

    User.findOne({username}).then(user => {
        if (!user) {
            return res.status(400).json('User does not exist');
        } else if (username == user.username && password == user.password) {
            return res.json(user);
        } else {
            return res.status(400).json('Invalid password.');
        }
    });
});

module.exports = router