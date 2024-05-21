const sequelize = require("../util/db_connect");
const Sequelize = require('sequelize');

const Seat = sequelize.define('seats',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  type:{
    type: Sequelize.ENUM('Business', 'Economy'),
    allowNull: false
  },
  capacity:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
},{
  timestamps: false
})

module.exports = Seat;