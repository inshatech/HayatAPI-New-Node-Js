const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection.js');
const fs = require('fs');
const path = require('path');
const bedRouter = require('./routes/bedRouter.js');
const dischargeRouter = require('./routes/dischargeRouter.js');
const fitnessRouter = require('./routes/fitnessRouter.js');
const patientRouter = require('./routes/patientRouter.js');


// Configuration
dotenv.config();

// Declarations
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const databaseName = process.env.DATABASE_NAME;
const connectionString = process.env.CONNECTION_STRING;
connectDB(connectionString, databaseName);

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*', //Server: 'https://lite.edunexgen.in' localhost: '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/back-office', bedRouter);
app.use('/back-office', dischargeRouter);
app.use('/back-office', fitnessRouter);
app.use('/back-office', patientRouter);




// Start server
app.listen(port, (err) => {
  if (err) {
    console.log(`Server connection error: ${err}`);
  } else {
    console.log(`Server connection established on url: http://localhost:${port}`);
  }
});
