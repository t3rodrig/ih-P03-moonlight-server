const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  paternalLastName: { type: String, required: true },
  maternalLastName: { type: String, required: false },
  imageURL: { type: String, trim: true, required: false },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: { type: String, required: true },
  phone: { type: Number, required: false },
  address: {
    street: { type: String },
    number: { type: Number },
    borough: { type: String },
    city: { type: String }
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
