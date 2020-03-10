const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
	{
		itemId: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		expiryDate: {
			type: Date,
			default: undefined,
		},
		manufacturingDate: {
			type: Date,
			default: undefined,
		},
		price: {
			type: Number,
			default: 0.0,
		},
		nutritionalInformation: {
			type: String,
			default: undefined,
		},
		image: {
			data: Buffer,
			contentType: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
