const router = require('express').Router();
const User = require('../../models/User');
const _ = require('lodash');
const auth = require('../../middleware/auth');

// signup new Viewers and Moderator
router.post('/signup', async ( req, res ) => {
    try {
        if(!req.body.role) throw new Error("Please provide role: either Moderator or Viewer")
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
        res.send({statusCode: 200, status:"Logged In Successfully", data: { user, token }})
    } catch (e) {
        console.log(e)
        res.status(500).send({ status: 'FAILED', error: e.message})
    }
});

router.post('/logout', auth, async ( req, res ) => {
    try {
        let result = await User.logout(req.token, req.user._id);
        console.log(result)

        res.status(200).send({ status: "SUCCES", message: "User has been logged out succesfully"});
    } catch (error) {
        res.status(404).send({ status: "FAILED", message: error.message });
    }
});

module.exports = router;