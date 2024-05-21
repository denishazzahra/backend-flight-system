const sequelize = require("../util/db_connect");
const Sequelize = require('sequelize');

const User = sequelize.define('users',{
  id:{
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  fullName:{
    type: Sequelize.STRING,
    allowNull: false
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  phone:{
    type: Sequelize.STRING,
    allowNull: false
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
  },
  profilePicture:{
    type: Sequelize.TEXT,
    allowNull: true
  },
  role:{
    type: Sequelize.ENUM("Admin", "User"),
    allowNull: false
  }
},{
  timestamps: false
})

module.exports = User;