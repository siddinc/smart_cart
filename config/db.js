'use strict';

const mongoose = require('mongoose');
const { dbConnectionURL } = require('./index');

mongoose.set('debug', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
	dbConnection: async () => {
		try {
			const dbConn = await mongoose.connect(dbConnectionURL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});

			console.log({ status: 'DB connection successful' });
		} catch (error) {
			return console.log({
				status: 'DB connection successful',
				error: dbConn.error,
			});
		}
	},
};
