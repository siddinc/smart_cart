'use strict';

const mongoose = require('mongoose');
const { dbConnectionURL } = require('./index');

// mongoose.set('useFindAndModify', false);
// mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

async function dbConnection() {
  try {
    const dbConn = await mongoose.connect(dbConnectionURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return { status: 1, dbConn: dbConn };
  } catch (error) {
    return { status: 0, error: error };
  }
}

module.exports = dbConnection;
