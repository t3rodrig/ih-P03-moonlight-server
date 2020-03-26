const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, min: 0, max: 1e4, required: true},
  available: {type: Number, min: 0, max:1e2, required: false},
  description: String,
  imageURL: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;