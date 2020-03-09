const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.43.113');

client.on('connect', () => {
  setInterval(() => {
    client.publish('cart/192.168.43.111', `${Math.random()}`);
  }, 1000);
});
