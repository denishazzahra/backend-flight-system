const sequelize = require("./db_connect");
const User = require('../model/User');
const Flight = require('../model/Flight');
const Seat = require('../model/Seat');
const Ticket = require("../model/Ticket");
const Airport = require("../model/Airport");

User.hasMany(Ticket)
Ticket.belongsTo(User)

Flight.hasMany(Seat)
Seat.belongsTo(Flight)

Flight.hasMany(Ticket)
Ticket.belongsTo(Flight)

User.hasMany(Ticket)
Ticket.belongsTo(User)

Seat.hasMany(Ticket);
Ticket.belongsTo(Seat);

Airport.hasMany(Flight, { as: 'origin_airport', foreignKey: 'originId' });
Airport.hasMany(Flight, { as: 'destination_airport', foreignKey: 'destinationId' });
Flight.belongsTo(Airport, { as: 'origin_airport', foreignKey: 'originId' });
Flight.belongsTo(Airport, { as: 'destination_airport', foreignKey: 'destinationId' });


const association = async ()=>{
  try {
      await sequelize.sync({});
  } catch (error) {
      console.log(error.message);
  }
}

module.exports = association; 