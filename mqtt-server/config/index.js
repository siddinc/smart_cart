'use strict';

const path = require('path');
const parsedEnv = require('dotenv').config({
  path: path.join(__dirname, '../.env.development'),
});

if (parsedEnv.error) {
  throw parsedEnv.error;
}

const config = {
  mqttServerPort: Number(process.env.MQTT_SERVER_PORT),
};

module.exports = config;
