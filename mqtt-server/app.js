'use strict';

const ip = require('ip');
const mosca = require('mosca');

const { mqttServerPort } = require('./config/index');
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

server.on('clientConnected', async client => {
  return logger.info(`Client connected: ${client.id}`);
});

server.on('clientDisconnected', client => {
  return logger.warn(`Client disconnected: ${client.id}`);
});

server.on('published', (packet, client) => {
  if (packet.topic.slice(0, 4) === 'cart') {
    return logger.silly(`Payload: ${packet.payload} published on topic: ${packet.topic}`);
  }

  return logger.verbose(`Payload: ${packet.payload} published on topic: ${packet.topic}`);
});