'use strict';

const path = require('path');
const parsedEnv = require('dotenv').config({
  path: path.join(__dirname, '../.env.development'),
});

if (parsedEnv.error) {
  throw parsedEnv.error;
}

const config = {
  httpServerPort: process.env.PORT || Number(process.env.HTTP_SERVER_PORT),
  dbConnectionURL: process.env.DB_CONNECTION_URL,
  jwtSecret: process.env.JWT_SECRET,
  saltRounds: Number(process.env.SALT_ROUNDS) || 10,
};

module.exports = config;
