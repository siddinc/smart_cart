'use strict';

const axios = require('axios');
const User = require('../models/user');
const Item = require('../models/item');

module.exports = {
	createUser: async (req, res, next) => {
		const { emailID, password } = req.body;
		let user = await User.findOne({ emailID });

		if (user) {
			return res.status(409).send({
				error: {
					status: res.statusCode,
					message: 'User already exists.',
				},
			});
		}

		let newUser = await User.create({ emailID, password });
		res.status(201).send({
			status: res.statusCode,
			message: 'New user created successfully.',
		});
	},

	stopCart: async (req, res, next) => {
		const { isStop } = req.body;

		if (isStop === true) {
			const req = await axios.post('cart_nodemcu_url', { isStop: 1 });
			return res.status(201).send({
				status: res.statusCode,
				message: 'Cart stopped successfully.',
			});
		}

		return res.status(400).send({
			error: {
				status: res.statusCode,
				message: 'Incorrect isStop value.',
			},
		});
	},

	startCart: async (req, res, next) => {
		const { isStart } = req.body;

		if (isStart === true) {
			const req = await axios.post('cart_nodemcu_url', { isStop: 0 });
			return res.status(201).send({
				status: res.statusCode,
				message: 'Cart started successfully.',
			});
		}

		return res.status(400).send({
			error: {
				status: res.statusCode,
				message: 'Incorrect isStart value.',
			},
		});
	},

	postItem: async (req, res, next) => {
		const { itemID, emailID } = req.body;
		let user = await User.findOne({ emailID });

		if (user === null) {
			return res.status(404).send({
				error: {
					status: res.statusCode,
					message: 'User not found.',
				},
			});
		}

		let item = await Item.findOne({ _id: itemID });

		if (item === null) {
			return res.status(404).send({
				error: {
					status: res.statusCode,
					message: 'Item not found.',
				},
			});
		}

		user.items.push(item);
		user = await user.save();

		res.status(201).send({
			status: res.statusCode,
			message: 'New item added successfully to cart.',
		});
	},

	getItems: async (req, res, next) => {
		const { emailID } = req.body;
		let user = await User.findOne({ emailID }).populate({
			path: 'items',
      model: 'Item',
      select: {_id: 0, __v: 0, createdAt: 0, updatedAt: 0}
		});

		if (user === null) {
			return res.status(404).send({
				error: {
					status: res.statusCode,
					message: 'User not found.',
				},
			});
    }
    
    res.status(200).send({
			status: res.statusCode,
      message: 'Items retrieved successfully.',
      data: {
       items: user.items 
      }
		});
	},
};
