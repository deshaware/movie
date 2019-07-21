const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();


require('./db/mongo');


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}));

app.get('/',(req,res)=>res.send(`Movie server is up and running`));

//routes
const role = require('./routes/api/role')
const user = require('./routes/api/user')
const movie = require('./routes/api/movie')
app.use('/api/movies',movie);
app.use('/api/users',user);
app.use('/api/roles',role);



const port = process.env.port || 5000;
app.listen(port,()=>console.log(`Listening at ${port}`));