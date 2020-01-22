'use strict';

const axios = require('axios');
const ip = require('ip');
const mosca = require('mosca');

const { mqttServerPort, nodejsServerURL, RFIDTopic } = require('./config/index');
const { logger } = require('./utils/logger');
const mqttServerIP = ip.address();

const moscaSettings = {
  port: mqttServerPort,
  host: mqttServerIP,
};

const server = new mosca.Server(moscaSettings);

server.on('ready', () => {
  console.log({
    status: 'MQTT server listening',
    port: mqttServerPort,
    host: mqttServerIP,
  });
});

server.on('clientConnected', client => {
  return logger.info(`Client connected: ${client.id}`);
});

server.on('clientDisconnected', client => {
  return logger.warn(`Client disconnected: ${client.id}`);
});

server.on('published', (packet, client) => {
  // if(packet.topic === RFIDTopic) {
  //   const itemID = String(packet.payload);

  //   axios.post(nodejsServerURL, { itemID, topic: packet.topic })
  //     .then(resp => logger.info(resp.data))
  //     .catch(error => {
  //       logger.error(error.message);
  //     });
  // }

  return logger.verbose(`Payload: ${packet.payload} published on topic: ${packet.topic}`);
});