const { httpServer } = require('./httpServer');
const { mqttServer } = require('./mqttServer');
const { dbConnection } = require('./config/db');

async function main() {
  try {
    await Promise.all([
      mqttServer(),
      dbConnection(),
      httpServer()
    ]);
  } catch(error) {
    process.exitCode(1);
    throw new Error('Instance failed to execute properly.');
  }
}

if (typeof module !== 'undefined' && !module.parent) {
	main();
}
