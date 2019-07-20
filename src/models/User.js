const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId
    },
    userName:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:mongoose.Types.ObjectId,
        ref:'Role'
    }
},{timestamps:true});

module.exports = User = mongoose.model('User',userSchema);