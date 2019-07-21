const router = require('express').Router();
const User = require('../../models/User');
const _ = require('lodash');
const auth = require('../../middleware/auth');

/**
 * @description insert new user
 * 
 */
router.post('/', auth, async ( req, res ) => {
    console.log(req.body);
});

module.exports = router;