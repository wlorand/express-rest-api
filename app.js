/**
 * File: app.js
 * Desc: Express web server for Crash Course
 */

// native node packages
const path = require('path');
// express
const express = require('express');
const app = express();
const PORT = process.env.port || 5000; // could also put this in a .env file

// import mock data Model
const members = require('./models/Members');

// import middleware
const requestLogger = require('./middleware/requestLogger');

// Init Middleware -- logger will now be called on EVERY request app-wide
// app.use(requestLogger);

// GET members
app.get('/api/v1/members', (req, res) => res.json(members));

// Static File - set static V1 -- send indiv static file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Static Folder - set static V2
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Express Server started and listening on port: ${PORT}`);
});
