'use strict';

const { httpServer } = require('./httpServer');
const { mqttServer } = require('./mqttServer');
const { dbConnection } = require('./config/db');

async function main() {
  try {
    await dbConnection()
    // await Promise.all([
    //   mqttServer(),
    //   dbConnection(),
    //   httpServer(),
    // ]);
  } catch(error) {
    console.error('Instance failed to execute properly.');
  }
}

if (typeof module !== 'undefined' && !module.parent) {
	main();
}
