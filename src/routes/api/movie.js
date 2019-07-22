const router = require('express').Router();
const User = require('../../models/User');
const _ = require('lodash');
const auth = require('../../middleware/auth');
const Movie = require('../../models/Movie');

// only admin could add movies
// @description : for bulk movies addition, add entire object in movies variable
router.post('/add', auth, async ( req, res ) => {
    try {
        if(req.user.role !== "Admin")
            res.status(401).send({"error":"Unauthorized"})
    
        // meaning bulk addition
        if(req.body.movies){
            let movies = req.body.movies;
            const visibleTo = req.body.visibleTo.includes(",") ? req.body.visibleTo.split(",") : req.body.visibleTo;
            if(typeof movies === "string"){
                movies = JSON.parse(movies);
            }
            if(typeof movies === "object"){
                if(Array.isArray(movies)){
                    movies.map(async m=>{
                        m.editor = req.user._id
                        m.isDeleted = false
                        m.visibleTo = visibleTo
                        const newMovie = new Movie(m);
                        await newMovie.save()
                    });
                } else {
                    // single object in a a string
                    movies.editor = req.user._id;
                    movies.isDeleted = false;
                    movies.visibleTo = visibleTo;
                    const newMovie = new Movie(movies);
                    await newMovie.save()
                }
                res.status(201).send({"data":"Movies has been succefully added"});
            }
        } else {
            // assuming single entry in movie
            let movie = {
                "99popularity":req.body._99popularity,
                director: req.body.director?req.body.director:null,
                imdb_score:req.body.imdb_score?req.body.imdb_score:null,
                name:req.body.name,
                editor:req.user._id,
                isDeleted:false,
                genre:req.body.genre ? req.body.genre.includes(",") ? req.body.genre.split(",") : req.body.genre : null,
                visibleTo:req.body.visibleTo ? req.body.visibleTo.includes(",") ? req.body.visibleTo.split(",") : req.body.visibleTo:null
            }
            const newMovie = new Movie(movie);
            await newMovie.save();
            res.status(201).send({"data":`Movie ${req.body.name} has been added succesfully`});
        }
        
    } catch (error) {
        res.status(400).send({error:error.message});
    }
});

// get all movies to view Admin. Moderator and Viewer
router.get('/all',auth, async (req, res ) => {
    try {
        let movies;
        console.log(req.user.role)
        if(req.user.role === "Admin"){
            movies = await Movie.find({"isDeleted":false});
        } else {
            movies = await Movie.find({"visibleTo":req.user.role, "isDeleted":false});
        }    
        res.status(200).send({movies});
    } catch (error) {
        res.status(400).send({error:error.message});
    }
});

//get one movie details
router.get('/:movie_name', auth, async (req, res ) => {
    const movieName = req.params.movie_name;
    try {
        if(!movieName) throw new Error("Invalid Moviename")
        let movie;
        if(req.user.role === "Admin"){
            movie = await Movie.findOne({name:movieName}).find({"isDeleted":false});
        } else { 
            movie = await Movie.findOne({name:movieName}).find({"visibleTo":req.user.role, "isDeleted":false});
            if(!movie) res.status(401).send({error:"Movie Not Found"})
        }  
        res.status(200).send(movie)
    } catch (e) {
        res.status(400).send({error:e.message});
    }
    
});
//edit movie details
router.patch('/edit/:movie_name', auth, async (req, res ) => {
    try {
        // Admin can do edit anything
        const movieName = req.params.movie_name;
        if(!movieName) throw new Error("Please provide movie valid id");
        if(req.user.role === "Admin"){
            const movie = Movie.findOne({name:movieName});
            console.log(movie)
        }
    } catch (e) {
        res.status(400).send({error:e.message});
    }

});


// delete movie
router.delete('/delete/:movie_name',auth, async ( req, res ) =>{
    try {
         //Admin
        const movieName = req.params.movie_name
        if(!movieName) throw new Error("Please provide movie name to delete");
        if(req.user.role === "Admin"){
            let r = await Movie.deleteOne({name:movieName});
            // res.status(200).send({data:"Movie has been delete successfully"})
            res.status(200).send({data:r})
        }
        // Moderator, only momovies which has access by moderator
        if(req.user.role === "Moderator"){
            const movie_id = await Movie.findOne({name:movieName,"visibleTo":"Moderator"})._id;
            if(!movie_id) throw new Error("No movie found!!");
            let r = await Movie.deleteOne({name:movieName});
            // res.status(200).send({data:"Movie has been delete successfully"})
            res.status(200).send({data:r})
        }
    } catch (e) {
        res.status(400).send({error:e.message});
    }
   
})
module.exports = router;