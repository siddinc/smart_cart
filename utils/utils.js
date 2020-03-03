const shortUuid = require('short-uuid');
const bcrypt = require('bcryptjs');
const mqtt = require('mqtt');
const jwt = require('jsonwebtoken');
const { saltRounds, jwtSecret } = require('../config/index');

exports.hashPassword = async inputPassword => {
	return bcrypt.hash(inputPassword, saltRounds);
};

exports.comparePassword = async (inputPassword, hashedPassword) => {
	return bcrypt.compare(inputPassword, hashedPassword);
};

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

// exports.publishCartDetails = (cartID) => {
// 	const client = mqtt.connect('mqtt://192.168.43.113');

// 	client.on('connect', () => {
// 		client.publish(`cart/${cartID}`, `${cartIP}`);
// 	});
// };
