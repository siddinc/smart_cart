const shortUuid = require('short-uuid');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const mqtt = require('mqtt');

exports.randomUUID = shortUuid.generate;

exports.hashPassword = async password => {
	return bcrypt.hash(password, saltRounds);
};

exports.comparePassword = async (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};

exports.publishCartDetails = (cartID, cartIP) => {
	const client = mqtt.connect('mqtt://192.168.43.113');

	client.on('connect', () => {
		client.publish(`cart/${cartID}`, `${cartIP}`);
	});
};
