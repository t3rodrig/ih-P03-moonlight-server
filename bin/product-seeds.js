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

let products = [
  {
    name: "product-1",
    price: 10,
    available: 10,
    imageURL: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-1_medium.png"
  },
  {
    name: "product-2",
    price: 10,
    available: 10,
    imageURL: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-2_medium.png"
  },
  {
    name: "product-3",
    price: 10,
    available: 10,
    imageURL: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-3_medium.png"
  },
  {
    name: "product-4",
    price: 10,
    available: 10,
    imageURL: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-4_medium.png"
  },
  {
    name: "product-5",
    price: 10,
    available: 10,
    imageURL: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-5_medium.png"
  },
  {
    name: "product-6",
    price: 10,
    available: 10,
    imageURL: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-6_medium.png"
  },
];

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