'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		mobile: {
			type: String,
			unique: true,
			required: true,
		},
		cartId: {
			type: String,
			// unique: true,
			// required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
