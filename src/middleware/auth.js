const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret;
const _ = require('lodash');

const auth = async (req, res, next) => {
    console.log("Authentication")

    try {
        const token = req.header("Authorization");
        const decode = jwt.verify(token,secret);
        const user = await User.findOne({_id: decode._id, 'tokens.token':token })
        
        if(!user){
            throw new Error("Unauthorized")
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error})
    }
};

module.exports = auth;