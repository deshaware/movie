const router = require('express').Router();
const _ = require('lodash')
const Role = require('../../models/Role');


/**
 * @description 
 *  To fetch all the roles available
 * @method get 
 * @authorization
 * none as of now
 */
router.get('/', async ( req , res ) => {
    try {
        const roles = await Role.find();
        res.status(200).send(roles);
    } catch (error) {
        res.status(400).send(error)
    }
});


/**
 * @description add new roles
 * @authorization needed, only admins could add
 * @method post
 */
router.post('/', async ( req, res ) => {
    try {
        let role = req.body.role;
        if(!role)
            throw "role cannot be empty";
        let newRole = new Role({role});
        newRole = await newRole.save();
        res.status(201).send(newRole);        
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;

