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

// app.get('/hello', (req, res, next) => res.send({message: "world"}));

// api routes
app.use('/api', router);

// 404 resource not found
app.use('*', (req, res, next) => {
  return res.status(404).send({
    error: {
      status: res.statusCode,
      message: 'Resource not found',
    },
  });
});

// custom error handler
app.use((err, req, res, next) => {
  return res.status(500 || err.status).send({
    error: {
      status: 500 || err.status,
      message: err.message,
    },
  });
});

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