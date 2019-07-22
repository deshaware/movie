const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    "99popularity":{
        type:Number,
    },
    director:{
        type: String
    },
    "genre":{
        type: [String],
        trim:true
    },
    "imdb_score":{
        type:Number,
        min:0.0,
        max:10.0
    },
    "name":{
        type: String,
        lowercase:true,
        required: true,
        index:true,
        unique:true
    },
    "editor":{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    "isDeleted":{
        type:Boolean
    },
    "visibleTo":[{
        type:String,
        trim:true
    }]
},{timestamps:true});


movieSchema.methods.toJSON = function(){
    const movie = this;
    const movieObj = movie.toObject()
    delete movieObj.isDeleted
    delete movieObj.editor
    delete movieObj.createdAt

    return movieObj
}

module.exports = Movie = mongoose.model('Movie',movieSchema);
