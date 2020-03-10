'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const ip = require('ip');
const morgan = require('morgan');
const { httpServerPort } = require('./config/index');
const router = require('./routes/index');
const httpServerIP = ip.address();

app.set('json spaces', 2);

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgan
app.use(morgan('dev'));

// api routes
app.use('/api', router);

// 404 resource not found
app.use('*', (req, res, next) => {
	return res.status(404).send({
		error: {
			status: res.statusCode,
			message: 'Resource not found',
		},
	});
});

// custom error handler
app.use((err, req, res, next) => {
	return res.status(500 || err.status).send({
		error: {
			status: 500 || err.status,
			message: err.message,
		},
	});
});

module.exports = {
	httpServer: async () => {
		app.listen(httpServerPort, () => {
			console.log({
				status: 'HTTP server listening',
				port: httpServerPort,
				host: httpServerIP,
			});
		});
	},
};
