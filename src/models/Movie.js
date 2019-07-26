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
    delete movieObj.editor
    delete movieObj.createdAt
    delete movieObj.updatedAt
    return movieObj
}

movieSchema.pre('validate', async function(next){
    const movie = this;
    let count = await Movie.find({name:movie.name,isDeleted:false});
            if(count.length>0) throw new Error("Movie already exist");
    next();
});

module.exports = Movie = mongoose.model('Movie',movieSchema);
