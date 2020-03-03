const mongoose = require("mongoose");
const Cart = require("../models/cart");
const Item = require("../models/item");
const { dbConnectionURL } = require('../config/index');
const { generateRandomUuid } = require('./utils');

mongoose.connect(dbConnectionURL, { useNewUrlParser: true })
.then(function() {
  console.log({ status: "DB_CONNECTION_ESTABLISHED" });
})
.catch(function(error) {
  console.log(error);
});

const items = [
  { itemId: "12345", name: "watermelon", price: 120.00, expiryDate: '2020-12-12', manufacturingDate: '2019-01-10' },
  { itemId: "67890", name: "orange", price: 340.00, expiryDate: '2020-11-23', manufacturingDate: '2019-05-01' },
  { itemId: "98765", name: "apple", price: 112.00, expiryDate: '2020-10-19', manufacturingDate: '2019-02-09' },
];

const seed = async () => {
  try {
    // return await Item.create(items);
    for(let i=0; i<10; i++) {
      await Cart.create({
        cartId: generateRandomUuid()
      });
    }
    return 1;
  } catch(error) {
    console.log(error);
  }
}

seed().then(res => console.log(res));