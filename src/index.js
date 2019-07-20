const express = require('express');
const bodyParser = require('body-parser');
dotenv.config();


require('./db/mongo');
const role = require('./models/Role');
const user = require('./models/User');
const movie = require('./models/Movie');


app.get('/',(req,res)=>res.send(`Movie server is up and running`));



const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}));
const port = process.env.port || 5000;
app.listen(port,()=>console.log(`Listening at ${port}`));