// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("../models/Product");

mongoose
.connect(process.env.URL_DB, {useNewUrlParser: true})
.then(x => {
  console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
.catch(err => {
  console.error('Error connecting to mongo', err);
});

const products = require('./products.json');

Product.deleteMany()
.then(() => {
  return Product.create(products);
})
.then(productsCreated => {
  console.log(`${productsCreated.length} products created with the following id:`);
  console.log(productsCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect();
})
.catch(err => {
  mongoose.disconnect();
  throw err;
});