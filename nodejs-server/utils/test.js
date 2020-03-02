const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.43.113');

client.on('connect', () => {
    client.publish('hello', `${Math.random()}`);
});