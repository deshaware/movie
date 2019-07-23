const mongoose = require('mongoose');
const mongoUri = require('../config/keys').mongoUri;

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,useFindAndModify:false
}).then((s)=>{
    console.log("Connected to the database")
}).catch(e=>console.log(`Error while connecting to db ${e}`));
