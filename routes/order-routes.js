const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order = require('../models/Order');

// GET route => to get all costumer's orders
router.get('/:email', (req, res, next) => {
  Order.find({}) // RULE IS MISSING
    .then(response => {
      res.json(response); // all the orders
    })
    .catch(() => res.status(400).json({ message: 'Getting Orders went wrong.' }));
});

// POST route => to create a new order
router.post('/', (req, res, next) => {
  const { products, customer } = req.body;
  Order.create({
    products,
    customer: customer._id
  })
  .then(response => {
    res.json(response);
  })
  .catch(() => res.status(400).json({ message: 'Saving Order went wrong.' }));
});

// DELETE route => to delete a specific order
router.delete('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified Order is not valid' });
    return;
  }

  Order.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: 'Order was removed successfully.' }))
    .catch(() => res.status(400).json({ message: 'Deleting Order went wrong.' }));
});

module.exports = router;