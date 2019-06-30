const connection = require('./indexSequelize.js');
const Sequelize = require('sequelize');


const Users = connection.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    required: true
  }
});

// Synchronize database
Users
  .sync()
  .then(() => console.log('Able to connect to Users Table'))
  .catch(err => console.error('Unable to connect to Users Table', err));

const Comments = connection.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    required: true
  },
  userId: {
    type: Sequelize.INTEGER,
    required: true
  }
});

Comments
  .sync()
  .then(() => console.log('Able to connect to Comments Table'))
  .catch(err => console.error('Unable to connect to Comments Table', err));

// Associate tables
Users.hasMany(Comments);
Comments.belongsTo(Users);

module.exports = {
  Users,
  Comments
};