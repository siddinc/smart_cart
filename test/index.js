// const mqtt = require('mqtt');
// const client = mqtt.connect('mqtt://192.168.43.113');

// client.on('connect', () => {
//     client.publish('hello', `${Math.random()}`);
// });

const axios = require('axios');

const main = () => {
  setInterval(async () => {
    try {
      const {data} = await axios.post("http://192.168.43.113:3000/api/get_items", { "mobile": "9876543210" });
      console.log(data.data.items.length);
      console.log("*");
    } catch(error) {
      console.log(error.message);
    }
  }, 1000);
};

// main();