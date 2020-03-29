const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products:{type: Array, required: true},
  customer: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;