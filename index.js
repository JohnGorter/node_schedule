const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const favicon = require('express-favicon');
const port = process.env.PORT || 5000;
const scheduler = require('./scheduler/schedule').current;

dotenv.config();

// Load config files
const salesforce = require('./config/jsforce');
const app = express()

// Load routes
const contractQuery = require('./routes/contractQuery')
const npsQuery = require('./routes/npsQuery')
const dbQuery = require('./routes/dbQuery')

//Middleware
app.use(cors())

// Set up session
app.use(session({
  secret: 's3cret', // it can be anything we want
  resave: true, // changed to true
  saveUninitialized: true,
}));

// Scheduler API
app.get('/logs', (req, res) => res.end(JSON.stringify(scheduler.log)))
app.get('/jobs', (req, res) => res.end(JSON.stringify({state:scheduler.status, jobs:scheduler.jobs})))
app.post('/cancel', (req, res) => { scheduler.cancelJobs(); return res.status(200).end() });
app.get('/start', (req, res) => { scheduler.start(); return res.status(200).end() });

// Use Routes
app.use('/contract_query', contractQuery)
app.use('/nps_query', npsQuery)
app.use('/db_query', dbQuery)

// Handle production
if (process.env.NODE_ENV === 'production') {
  app.use(favicon(__dirname + '/build/favicon.ico'));
  // Static folder
  app.use(express.static(__dirname));
  // Handle SPA
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  require('dotenv').load();
}

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await salesforce.login()
  scheduler.start();
})
