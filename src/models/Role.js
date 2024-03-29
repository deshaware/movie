const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId
    },
    role:{
        type: String,
        required: true,
    },
},{
    timestamps:true
});

module.exports = Role = mongoose.model('Role',roleSchema);