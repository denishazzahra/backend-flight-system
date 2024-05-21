const sequelize = require("../util/db_connect");
const Sequelize = require('sequelize');

const Flight = sequelize.define('flights',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  airline:{
    type: Sequelize.STRING,
    allowNull: false
  },
  flightNumber:{
    type: Sequelize.STRING,
    allowNull: false
  },
  departure_time:{
    type: Sequelize.TIME,
    allowNull: true
  },
  arrival_time:{
    type: Sequelize.TIME,
    allowNull: true
  },
},{
  timestamps: false
})

module.exports = Flight;