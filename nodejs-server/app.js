'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const ip = require('ip');
const morgan = require('morgan');

const dbConnection = require('./config/db');
const { httpServerPort } = require('./config/index');
const router = require('./routes/index');
const httpServerIP = ip.address();

app.set('json spaces', 4);

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgan
app.use(morgan('dev'));

// helmet
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);
app.use(helmet.noCache());

// cors
const corsOptions = {
  origin: '*',
  methods: ['POST', 'OPTIONS'],
  preflightContinue: true,
  credentials: true,
  optionsSuccessStatus: 204 || 200,
};

// api routes
app.use('/item', cors(corsOptions), router);

// error 404 resource not found handler
app.use('*', (req, res, next) => {
  try {
    const error = errorMessages.RESOURCE_NOT_FOUND();
    throw new HttpError(error.status, error.message);
  } catch (error) {
    return next(errorHandler(error));
  }
});

// custom error handler middleware
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    return res.status(err.statusCode).send(err);
  });
}

async function main() {
//   const dbConn = await dbConnection();

//   if (dbConn.status === 1) {
//     console.log({ status: 'DB connection successful' });
//   } else {
//     return console.log({
//       status: 'DB connection unsuccessful',
//     //   error: dbConn.error,
//     });
//   }

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
