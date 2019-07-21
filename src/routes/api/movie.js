const router = require('express').Router();
const User = require('../../models/User');
const _ = require('lodash');
const auth = require('../../middleware/auth');
const Movie = require('../../models/Movie');

// only admin could add movies
router.post('/add', auth, async ( req, res ) => {
    try {
        if(req.user.role !== "Admin")
            res.status(401).send({"error":"Unauthorized"})
        const movies = req.body.movies;
        const visibleTo = req.body.visibleTo.split(",")
        console.log(typeof(movies));
        if(typeof movies === "object"){
            movies.map(async m=>{
                m.editor = req.user._id
                m.isDeleted = false
                m.visibleTo = visibleTo
                const newMovie = new Movie(m);
                await newMovie.save()
            });
            res.status(201).send({"data":"Movies has been succefully added"})
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;