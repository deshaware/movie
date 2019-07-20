const express = require('express');
require('./db/mongo');
const app = express();

const port = process.env.port || 5000;
app.listen(port,()=>console.log(`Listening at ${port}`));