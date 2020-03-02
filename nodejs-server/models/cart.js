const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
	{
		cartID: {
			type: String,
			unique: true,
			required: true,
		},
		cartIP: {
			type: String,
			unique: true,
			required: true,
		},
		items: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Item',
				default: undefined,
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
