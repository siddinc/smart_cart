const mongoose = require("mongoose");
const Cart = require("../models/cart");
const Item = require("../models/item");
const { dbConnectionURL } = require('../config/index');
const { randomUUID } = require('./utils');

mongoose.connect(dbConnectionURL, { useNewUrlParser: true })
.then(function() {
  console.log({ status: "DB_CONNECTION_ESTABLISHED" });
})
.catch(function(error) {
  console.log(error);
});

const items = [
  { itemID: "12345", name: "watermelon" },
  { itemID: "67890", name: "orange" },
  { itemID: "98765", name: "apple" },
];

const seed = async () => {
  try {
    // return await Item.create(items);
    // console.log(newItems);
    for(let i=0; i<10; i++) {
      await Cart.create({
        cartID: randomUUID(),
        cartIP: `192.168.43.11${i}`
      });
    }
    return 1;
  } catch(error) {
    console.log(error);
  }
}

seed().then(res => console.log(res));

