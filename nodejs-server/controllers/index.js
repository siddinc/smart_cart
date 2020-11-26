'use strict';

const Cart = require('../models/cart');
const Item = require('../models/item');
const User = require('../models/user');
const { createJwt, publishStopStatus } = require('../utils/utils');

module.exports = {
  signIn: async (req, res, next) => { // mobile, cartId
    const { mobile, cartId } = req.body;
    let user = await User.findOne({ mobile });

    if(user) {
      return res.status(409).send({
        error: {
          status: res.statusCode,
          message: 'User already exists.',
        },
      });
    }

    let cart = await Cart.findOne({ cartId });

    if (!cart) {
      return res.status(404).send({
        error: {
          status: res.statusCode,
          message: 'Cart does not exist.',
        },
      });
    }

    if(cart.taken) {
      return res.status(409).send({
        error: {
          status: res.statusCode,
          message: 'Cart is already taken.',
        },
      });
    }

    let newUser = await User.create({ mobile });
    newUser.cartId = cartId;
    newUser = await newUser.save();
    cart.userMobile = mobile;
    cart.taken = true;
    cart = await cart.save();

    const token = await createJwt({ mobile, cartId });

    res.status(200).send({
      status: res.statusCode,
      message: 'Signed in successfully.',
      data: {
        token,
      },
    });
  },

  stopCart: async (req, res, next) => { // mobile, isStop
    const { isStop } = req.body;

    switch (isStop) {
      case 1: {
        publishStopStatus(res.locals.user.cartId, 1);
        return res.status(200).send({
          status: res.statusCode,
          message: 'Cart stopped successfully.',
        });
      }

      case 0: {
        publishStopStatus(res.locals.user.cartId, 0);
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

  postItem: async (req, res, next) => { // cartId, itemId
    const { cartId, itemId } = req.body;
    let item = await Item.findOne({ itemId });
    
    if (!item) {
      return res.status(404).send({
        error: {
          status: res.statusCode,
          message: 'Item does not exist.',
        },
      });
    }
    
    let cart = await Cart.findOneAndUpdate({ cartId }, { $push: { items: item } });

    res.status(201).send({
      status: res.statusCode,
      message: 'New item added successfully to cart.',
    });
  },

  getItems: async (req, res, next) => { // mobile
    let cart = await Cart.findOne(
      { cartId: "n7EWpiv29zb7GjXctQUKSh" },
      { 'items._id': 0, 'items.__v': 0, 'items.createdAt': 0, 'items.updatedAt': 0 },
    );

    if(cart.items.length === 0) {
      return res.status(200).send({
        status: res.statusCode,
        message: `No items present in cart.`,
      });
    }

    res.status(200).send({
      status: res.statusCode,
      message: `Items present in cart retrieved successfully.`,
      data: {
        items: cart.items,
      },
    });
  },

  deleteItem: async (req, res, next) => { // mobile, itemId
    const { itemId } = req.body;
    let cart = await Cart.findOneAndUpdate(
      { cartId: res.locals.user.cartId },
      { $pull: { items: { itemId }} },
      { new: true },
      { 'items._id': 0, 'items.__v': 0, 'items.createdAt': 0, 'items.updatedAt': 0 },
    );

    if(cart.items.length === 0) {
      return res.status(200).send({
        status: res.statusCode,
        message: `No items present in cart.`,
      });
    }

    res.status(200).send({
      status: res.statusCode,
      message: `Item deleted successfully.`,
      data: {
        itemsRemaining: cart.items,
      }
    });
  },
};