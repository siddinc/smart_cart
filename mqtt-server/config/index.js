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
  nodejsServerURL: process.env.NODEJS_SERVER_URL,
  RFIDTopic: process.env.RFID_TOPIC,
};

module.exports = config;
