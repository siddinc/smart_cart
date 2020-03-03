'use strict';

const axios = require('axios');
const mqtt = require('mqtt');
const Cart = require('../models/cart');
const Item = require('../models/item');
const User = require('../models/user');
const { publishCartDetails, createJwt } = require('../utils/utils');

module.exports = {
  // signUp: async (req, res, next) => {
  //   const { email, password, cartId } = req.body;
  //   const user = await User.findOne({ email });

  //   if(user) {
  //     return res.status(409).send({
  //       error: {
  //         status: res.statusCode,
  //         message: 'User already exists.',
  //       },
  //     });
  //   }

  //   const token = await createJwt({ email });
  //   const newUser = await User.create({ email, password });

  //   return res.status(200).send({
  //     status: res.statusCode,
  //     message: 'New user created successfully.',
  //     data: {
  //       token,
  //     },
  //   });
  // },

  signIn: async (req, res, next) => {
    const { email, password, cartId } = req.body;
    let user = await User.findOne({ email });

    if(!user) {
      return res.status(404).send({
        error: {
          status: res.statusCode,
          message: 'User does not exist.',
        },
      });
    }

    if(password !== user.password) {
      return res.status(400).send({
        error: {
          status: res.statusCode,
          message: 'Invalid password. Please enter valid password again.',
        },
      });
    }

    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      return res.status(404).send({
        error: {
          status: res.statusCode,
          message: 'Cart not found.',
        },
      });
    }

    user.cartId = cartId;
    user = await user.save();
    cart.userEmail = email;
    cart = await cart.save();

    // publishCartDetails(cartID, cart.cartIP);

    res.status(200).send({
      status: res.statusCode,
      message: 'Logged in successfully.',
    });
  },

  stopCart: async (req, res, next) => {
    const { isStop, email } = req.body;
    const cart = await Cart.findOne({ userEmail: email });

    if(!cart) {
      return res.status(404).send({
        error: {
          status: res.statusCode,
          message: 'User cart does not exist.',
        },
      });
    }

    switch (isStop) {
      case 1: {
        // const req = await axios.post('cart_nodemcu_url', { isStop: 1 });
        return res.status(200).send({
          status: res.statusCode,
          message: 'Cart stopped successfully.',
        });
      }

      case 0: {
        // const req = await axios.post('cart_nodemcu_url', { isStop: 0 });
        return res.status(200).send({
          status: res.statusCode,
          message: 'Cart started successfully.',
        });
      }

      default: {
        return res.status(400).send({
          error: {
            status: res.statusCode,
            message: 'Incorrect isStop value.',
          },
        });
      }
    }
  },

  postItem: async (req, res, next) => {
    const { email, itemId } = req.body;
    let cart = await Cart.findOne({ userEmail: email });

    if (!cart) {
      return res.status(404).send({
        error: {
          status: res.statusCode,
          message: 'User cart not found.',
        },
      });
    }

    let item = await Item.findOne({ itemId });

    if (!item) {
      return res.status(404).send({
        error: {
          status: res.statusCode,
          message: 'Item not found.',
        },
      });
    }

    cart.items.push(item);
    cart = await cart.save();

    res.status(201).send({
      status: res.statusCode,
      message: 'New item added successfully to cart.',
    });
  },

  getItems: async (req, res, next) => {
    const { email } = req.body;
    let cart = await Cart.findOne({ userEmail: email }).populate({
      path: 'items',
      model: 'Item',
      select: { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
    });

    if (!cart) {
      return res.status(404).send({
        error: {
          status: res.statusCode,
          message: 'User cart not found.',
        },
      });
    }

    res.status(200).send({
      status: res.statusCode,
      message: `Items retrieved successfully ${cart.userEmail}.`,
      data: {
        items: cart.items,
      },
    });
  },

  deleteItem: async (req, res, next) => {
    const { email, itemId } = req.body;
    let cart = await Cart.findOne({ userEmail: email }).populate({
      path: 'items',
      model: 'Item',
      select: { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 },
    });

    if (!cart) {
      return res.status(404).send({
        error: {
          status: res.statusCode,
          message: 'User cart not found.',
        },
      });
    }

    cart.items = cart.items.filter(item => item.itemId !== itemId);
    cart = await cart.save();

    res.status(200).send({
      status: res.statusCode,
      message: `Items retrieved successfully ${cart.userEmail}.`,
      data: {
        items: cart.items,
      },
    });
  },
};