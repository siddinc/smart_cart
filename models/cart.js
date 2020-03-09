const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
	{
		cartId: {
			type: String,
			unique: true,
			required: true,
		},
		userMobile: {
      type: String,
      default: undefined,
			// unique: true,
			// required: true,
		},
		taken: {
			type: Boolean,
			// required: true,
			default: false,
		},
		items: ['Item'],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
