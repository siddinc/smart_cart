'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const ip = require('ip');
const morgan = require('morgan');

const dbConnection = require('./config/db');
const { httpServerPort } = require('./config/index');
const router = require('./routes/index');
const httpServerIP = ip.address();

app.set('json spaces', 2);

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgan
app.use(morgan('dev'));

// api routes
app.use('/api', router);

async function main() {
  const dbConn = await dbConnection();

  if (dbConn.status === 1) {
    console.log({ status: 'DB connection successful' });
  } else {
    return console.log({
      status: 'DB connection unsuccessful',
      error: dbConn.error,
    });
  }

  app.listen(httpServerPort, () => {
    console.log({
      status: 'HTTP server listening',
      port: httpServerPort,
      host: httpServerIP,
    });
  });
}

if (typeof module !== 'undefined' && !module.parent) {
  main();
}