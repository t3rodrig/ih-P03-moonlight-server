const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  customer: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;