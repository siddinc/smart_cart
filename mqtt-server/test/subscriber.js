const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.43.113');

client.on('connect', () => client.subscribe('cart/192.168.43.111'));

client.on('message', (topic, message) => {
  console.log(message.toString(), topic);
});
