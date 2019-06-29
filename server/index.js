const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbHelpers = require('../database/dbHelpers');

const PORT = process.env.port || 3000;

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));
server.use(morgan('dev'));
server.use(express.static(path.join(__dirname, '../client/dist')));

server.get('/users', (req, res) => {
  dbHelpers.getUsers((data) => {
    res.status(200).send(data);
  })
})

server.get('/comments', (req, res) => {
  dbHelpers.getComments((data) => {
    res.status(200).send(data);
  })
})

server.get('/commentsforuser/:username', (req, res) => {
  let username = req.params.username;
  dbHelpers.getCommentsForUser(username, (data) => {
    res.status(200).send(data);
  })
})

server.listen(PORT, console.log(`Listening to port ${PORT}`));