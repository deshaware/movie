const router = require('express').Router();
const User = require('../../models/User');
const _ = require('lodash');
const auth = require('../../middleware/auth');

// signup new Viewers and Moderator
router.post('/signup', async ( req, res ) => {
    try {
        const user = new User(req.body)
        // req.role = await user.assignRole();
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch (error) {
        res.status(400).send({error:error.message})
    }
});

// get me
router.get('/me', auth , async ( req, res ) => {
    const {user,token} = req;
    res.status(200).send({user,token})    
});



router.post('/login', async (req, res) => {
    try {
        console.log(req.body.email)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router;