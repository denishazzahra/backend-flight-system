const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    components:{
			securitySchemes:{
					BearerAuth:{            
						type: 'http',
						scheme: 'bearer'
					}
			}
		},
    info: {
      title: 'Flight Ticket Booking System',
      version: '1.0.0',
      description: 'API documentation for this system.',
    },
  },
	tags: [ 
		{ name: 'User', description: 'Operations related to users' },
		{ name: 'Airport', description: 'Operations related to airports' },
		{ name: 'Flight', description: 'Operations related to flights' },
		{ name: 'Seat', description: 'Operations related to seats' },
		{ name: 'Ticket', description: 'Operations related to tickets' },
		{ name: 'Admin', description: 'Operations related to admin' },
	],
  apis: [
		'./routes/user.js',
		'./routes/airport.js',
		'./routes/flight.js',
		'./routes/seat.js',
		'./routes/ticket.js',
		'./routes/admin.js'
	], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;