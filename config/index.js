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
  mqttServerPort: Number(process.env.MQTT_SERVER_PORT) || Number(process.env.MQTT_SERVER_PORT),
  jwtSecret: process.env.JWT_SECRET,
  dbConnectionURL: process.env.DB_CONNECTION_URL,
  mqttServerURL: process.env.MQTT_SERVER_URL,
};

module.exports = config;
