const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {type: String, trim: true, required: true},
  price: {type: Number, min: 0, max: 1e4, required: true},
  available: {type: Number, default:0, min: 0, max:1e2, required: true},
  description: {type: String, required: false},
  imageURL: {type: String, trim: true, required: false},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;