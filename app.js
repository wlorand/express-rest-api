/**
 * File: app.js
 * Desc: Express web server for Crash Course
 */

// native node packages
const path = require('path');

//
const express = require('express');

const app = express();

const PORT = process.env.port || 5000; // could also put this in a .env file

// Static File - set static V1 -- send indiv static file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Static Folder - set static V2
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Express Server started and listening on port: ${PORT}`);
});
