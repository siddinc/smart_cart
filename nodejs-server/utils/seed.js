'use strict';

const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const Cart = require("../models/cart");
const Item = require("../models/item");
const { dbConnectionURL } = require('../config/index');
const { generateRandomUuid } = require('./utils');
const IMAGES_PATH = path.join(__dirname, '../static/images');

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const items = [
  { itemId: "12345", name: "watermelon", price: 120.00, expiryDate: '2020-12-12', manufacturingDate: '2019-01-10', image: undefined },
  { itemId: "12346", name: "apple", price: 340.00, expiryDate: '2020-11-23', manufacturingDate: '2019-05-01', image: undefined },
];

const createItems = async (i) => {
  let image = fs.readFileSync(IMAGES_PATH + `/${i}.jpg`);
  let base64Image = new Buffer.from(image.toString('base64'), 'base64');
  items[i].image = base64Image;
  let item = await Item.create(items[i]);
};

const createCarts = async () => {
  for(let i=0; i<3; i++) {
    let cart = await Cart.create({
      cartId: generateRandomUuid(),
      taken: false
    });
  }
};

const seed = async () => {
  try {  
    for(let i=0; i<2; i++) {
      await createItems(i);
    }
  } catch(error) {
    console.log(error);
  }
}

mongoose.connect(dbConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => {
    console.log({ status: "DB_CONNECTION_ESTABLISHED" });
    seed().then(() => console.log(1));
  })
  .catch(function(error) {
    console.log(error);
  });