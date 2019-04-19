const winston = require('winston');
// this catches promise rejections so we dont need to use try catch blocks - must be at top of file
require('express-async-errors');
// handle uncaught exceptions that happen outwith express 
process.on('uncaughtException', (ex) => {
    console.log('We got an uncaught exception')
    winston.error(ex.message, ex);
    process.exit(1);
});


// handle unhandled promise rejections that happen outwith express 
process.on('unhandledRejection', (ex) => {
    console.log('We got an unhandled rejection')
    winston.error(ex.message, ex);
    process.exit(1);
});

winston.add(winston.transports.File, { filename: 'logfile.log' });