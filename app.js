/**
 * File: app.js
 * Desc: Express web server for Crash Course
 */

// native node packages
const path = require('path');
// express
const express = require('express');
const app = express();
const PORT = process.env.port || 5000; // could also put this in a .env fil

// import middleware file
const requestLogger = require('./middleware/requestLogger');

// Members API Routes
const memberRoutes = require('./routes/api/memberRoutes');

// Init Middleware

// logging middleware
app.use(requestLogger);

// Body Parser middleware -- no longer need the body-parser 3p package
app.use(express.json());
// Form Submission support middleware
app.use(express.urlencoded({ extended: false }));

// route file middleware  -- handles addressing
app.use('/api/v1/members', memberRoutes); // first route-level middleware  -- xtra path route, then routes as middleware

// Routes - now in the routes/api/memberRoutes.js file

// Static File - set static V1 -- send indiv static file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Static Folder - set static V2
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Express Server started and listening on port: ${PORT}`);
});
