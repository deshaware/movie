const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret;
const _ = require('lodash');

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if(!token) throw new Error("User not authenticated")
        const decode = jwt.verify(token,secret);
        const user = await User.findOne({_id: decode._id, 'tokens.token':token })
        if(!user){
            throw new Error("Unauthorized")
        }
        //refresh token to next 5 mins
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error:error.message})
    }
};
module.exports = auth;