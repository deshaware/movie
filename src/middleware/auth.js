const router = require('express').Router();
const User = require('../models/User');
const _ = require('lodash');

const auth = async (req, res, next) => {
    console.log("Authentication")
    console.log(req);
    next();
};

module.exports = auth;