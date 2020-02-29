const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		userID: {
			type: String,
			// required: true,
			// unique: true,
    },
    emailID: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
		cartID: {
			type: String,
			// required: true,
			// unique: true,
		},
		items: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Item',
			default: undefined,
		}],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);