'use strict';

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.43.113');

client.on('connect', () => client.subscribe('cart/eLp5SA7y4t2jGAKhZe16Mt'));

client.on('message', (topic, message) => {
  console.log(message.toString(), topic);
});
