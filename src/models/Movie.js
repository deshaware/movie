const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    "99popularity":{
        type:Number,
    },
    director:{
        type: String
    },
    "genre":{
        type: [String]
    },
    "imdb_score":{
        type:Number,
        min:0.0,
        max:10.0
    },
    "name":{
        type: String,
        required: true,
        index:true
    },
    "editor":{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    "isDeleted":{
        type:Boolean
    },
    "visibleTo":[{
        type:String
    }]
},{timestamps:true});



module.exports = Movie = mongoose.model('Movie',movieSchema);
