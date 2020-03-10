const shortUuid = require('short-uuid');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');
const { jwtSecret, mqttServerURL } = require('../config/index');

exports.generateRandomUuid = () => {
	return shortUuid.generate();
};

exports.createJwt = async obj => {
	return jwt.sign(obj, jwtSecret, { expiresIn: 86400 * 15 });
};

exports.verifyJwt = async token => {
	return jwt.verify(token, jwtSecret);
};

exports.extractJwt = req => {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		return req.headers.authorization.split(' ')[1];
	}
	return false;
};

exports.publishStopStatus = (cartId, status) => {
	const client = mqtt.connect(mqttServerURL);

	client.on('connect', () => {
		client.publish(`server/cart/${cartId}`, `${status}`);
	});
};
