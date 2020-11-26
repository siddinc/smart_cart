'use strict';

const ip = require('ip');
const mosca = require('mosca');
const Cart = require('./models/cart');

const { mqttServerPort } = require('./config/index');
const { logger } = require('./utils/logger');
const mqttServerIP = ip.address();

const moscaSettings = {
	port: mqttServerPort,
	host: mqttServerIP,
};

const server = new mosca.Server(moscaSettings);

module.exports = {
	mqttServer: async () => {
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

		server.on('published', async (packet, client) => {
			if (packet.topic === 'rfid') {
        console.log("meow");
        let cart = await Cart.findOne({ cartId: "n7EWpiv29zb7GjXctQUKSh" });
        cart.items.push({ itemId: packet.payload });
        cart = await cart.save();
        console.log("done");
      }

			return logger.verbose(
				`Payload: ${packet.payload} published on topic: ${packet.topic}`
			);
		});
	},
};
