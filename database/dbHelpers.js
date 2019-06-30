const ModelsSeq = require('./modelSequelize.js');

getUsers = () => {
  return ModelsSeq.Users.findAll({})
}

getComments = () => {
  return ModelsSeq.Comments.findAll({})
}

getCommentsForUser = (username) => {
  return ModelsSeq.Comments.findAll({
    include: [{
      model: ModelsSeq.Users,
      where: { username }
    }]
  })
  // return (
  //   ModelsSeq.Users
  //     .findOne({ username })
  //     .then((data) => {
  //       return ModelsSeq.Comments
  //         .findAll({ where: { userId: data.id } })
  //     })
  // )


}


module.exports = {
  getUsers,
  getComments,
  getCommentsForUser
}


