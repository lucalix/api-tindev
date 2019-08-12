const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express();

mongoose.connect('mongo_user_password', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json()); 
server.use(routes);

server.listen(3333);