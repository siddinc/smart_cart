const { httpServer } = require('./httpServer');
const { mqttServer } = require('./mqttServer');

async function main() {
  // await mqttServer();
  await httpServer();
}

if (typeof module !== 'undefined' && !module.parent) {
  main();
}