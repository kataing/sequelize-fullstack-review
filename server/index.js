const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dbHelpers = require('../database/dbHelpers');

const PORT = process.env.port || 3000;

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan('dev'));
server.use(express.static(path.join(__dirname, '../client/dist')));

server.get('/users', (req, res) => {
  dbHelpers.getUsers()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send('We can not get users');
    });
})

server.get('/comments', (req, res) => {
  dbHelpers.getComments()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send('We can not get users');
    });
})

server.get('/comments/:username', (req, res) => {
  let username = req.params.username;
  dbHelpers.getCommentsForUser(username)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send('We can not get users');
    });
})

server.listen(PORT, console.log(`Listening to port ${PORT}`));