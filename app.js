const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./db/connection.js');
const bedRouter = require('./routes/bedRouter.js');
const dischargeRouter = require('./routes/dischargeRouter.js');
const fitnessRouter = require('./routes/fitnessRouter.js');
const patientRouter = require('./routes/patientRouter.js');
const medicineLibraryRouter = require('./routes/medicineLibraryRouter.js');
const userRouter = require('./routes/userRouter.js');
const opdRouter = require('./routes/opdRouter.js');
const whatsAppRouter = require('./routes/whatsAppRouter.js');
const bedHistoryRouter = require('./routes/bedHistoryRouter.js');
const ipdRouter = require('./routes/ipdRouter.js');
const billingRouter = require('./routes/ipdRouter.js');

// Configuration
dotenv.config();

// Declarations
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const databaseName = process.env.DATABASE_NAME;
const connectionString = process.env.CONNECTION_STRING;
connectDB(connectionString, databaseName);

// Use Helmet for security headers
app.use(helmet());

// IP-based Access Control
const allowedIPs = ['127.0.0.1', '::1']; // Include other trusted IPs

app.use((req, res, next) => {
  const clientIP = req.ip;
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  next();
});

// CORS Setup with Environment Variables
const allowedDomains = ['*'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
};

app.use(cors(corsOptions));

// Use Morgan for logging HTTP requests
app.use(morgan('combined')); // or use 'dev' for concise logs during development

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/back-office', bedRouter);
app.use('/back-office', dischargeRouter);
app.use('/back-office', fitnessRouter);
app.use('/back-office', patientRouter);
app.use('/back-office', medicineLibraryRouter);
app.use('/back-office', userRouter);
app.use('/back-office', opdRouter);
app.use('/back-office', ipdRouter);
app.use('/back-office', billingRouter);
app.use('/back-office', bedHistoryRouter);

app.use('/back-office', whatsAppRouter);

// Handle unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start Server
app.listen(port, (err) => {
  if (err) {
    console.log(`Server connection error: ${err}`);
  } else {
    console.log(`Server connection established on url: http://localhost:${port}`);
  }
});
