const ModelsSeq = require('./modelSequelize.js');

getUsers = (cb) => {
  ModelsSeq.Users
    .findAll({})
    .then((data) => {
      cb(data);
    })
    .catch((err) => console.error(err));

}

getComments = (cb) => {
  ModelsSeq.Comments
    .findAll({})
    .then((data) => {
      cb(data);
    })
    .catch((err) => console.error(err));
}

getCommentsForUser = (username, cb) => {
  ModelsSeq.Users
    .findOne({ username })
    .then((data) => {
      ModelsSeq.Comments
        .findAll({ where: { userId: data.id }})
        .then((data) => {
          cb(data);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));

}


module.exports = {
  getUsers,
  getComments,
  getCommentsForUser
}


