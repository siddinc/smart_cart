'use strict';

const path = require('path');
const parsedEnv = require('dotenv').config({
  path: path.join(__dirname, '../.env.development'),
});

if (parsedEnv.error) {
  throw parsedEnv.error;
}

const config = {
  httpServerPort: Number(process.env.HTTP_SERVER_PORT),
  dbConnectionURL: process.env.DB_CONNECTION_URL,
};

module.exports = config;
