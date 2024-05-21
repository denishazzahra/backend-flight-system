const sequelize = require("../util/db_connect");
const Sequelize = require('sequelize');

const Ticket = sequelize.define('tickets',{
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
  date:{
    type: Sequelize.DATEONLY,
    allowNull: false
  },

},{
  timestamps: false
})

module.exports = Ticket;