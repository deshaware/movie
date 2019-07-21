const router = require('express').Router();
const User = require('../../models/User');
const _ = require('lodash');
const auth = require('../../middleware/auth');

// signup new Viewers and Moderator
router.post('/add', auth, async ( req, res ) => {
    // json data is coming
    try {
        if(req.user.role !== "Admin")
            res.status(401).send({"error":"Unauthorized"})
        console.log(req.movies)
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;