const { httpServer } = require('./httpServer');
const { mqttServer } = require('./mqttServer');
const { dbConnection } = require('./config/db');

async function main() {
  await dbConnection();
	await mqttServer();
	await httpServer();
}

if (typeof module !== 'undefined' && !module.parent) {
	main();
}
