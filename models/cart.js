const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
	{
		cartId: {
			type: String,
			unique: true,
			required: true,
		},
		userEmail: {
			type: String,
			// unique: true,
			// required: true,
		},
		taken: {
			type: Boolean,
			// required: true,
			default: false,
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
