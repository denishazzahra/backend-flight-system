const express = require('express');
const association = require('./util/dbAssoc');
const userRouter = require('./routes/user');
const flightRouter = require('./routes/flight');
const seatRouter = require('./routes/seat');
const airportRouter = require('./routes/airport');
const ticketRouter = require('./routes/ticket');
const adminRouter = require('./routes/admin');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const port = process.env.PORT;
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(userRouter);
app.use(flightRouter);
app.use(seatRouter);
app.use(airportRouter);
app.use(ticketRouter);
app.use(adminRouter);

app.get("/", (req,res,next)=>{
  res.json({
    message: "Hello from another service"
  })
})

association().then(()=>{
  app.listen(port);
  console.log('connected to db')
}).catch(e=>{
  console.log(e);
})