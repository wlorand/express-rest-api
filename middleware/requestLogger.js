/**
 * File; requestLogger.js
 * Desc: simple logging middleware
 */

// import libs
const moment = require('moment');

const requestLogger = (req, res, next) => {
  // log out the full url that made this request + date/time
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = requestLogger;
