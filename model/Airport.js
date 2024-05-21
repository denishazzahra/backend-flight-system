const sequelize = require("../util/db_connect");
const Sequelize = require('sequelize');

const Airport = sequelize.define('airports',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false
  },
  city:{
    type: Sequelize.STRING,
    allowNull: false
  },
  province:{
    type: Sequelize.STRING,
    allowNull: false
  },
  code:{
    type: Sequelize.STRING,
    allowNull: true
  },
  timezone:{
    type: Sequelize.STRING,
    allowNull: true
  },
},{
  timestamps: false
})

module.exports = Airport;