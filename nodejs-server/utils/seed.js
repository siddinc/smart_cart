const mongoose = require("mongoose");
const User = require("../models/user");
const Item = require("../models/item");
const { dbConnectionURL } = require('../config/index');

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
    return await Item.create(items);
    console.log(newItems);
  } catch(error) {
    console.log(error);
  }
}

seed().then(res => console.log(res));