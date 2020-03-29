const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order = require('../models/Order');

// POST route => to create a new order
router.post('/orders', (req, res, next) => {
  const { products, customer } = req.body;
  Order.create({
    products,
    customer: customer._id
  })
  .then(response => {
    res.json(response);
  })
  .catch(() => res.status(400).json({ message: 'Saving Order to database went wrong.' }));
});

// DELETE route => to delete a specific order
router.delete('/orders/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Order.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: 'Order was removed successfully.' }))
    .catch(() => res.status(400).json({ message: 'Deleting Order from database went wrong.' }));
});

module.exports = router;