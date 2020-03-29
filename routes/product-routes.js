const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../models/Product');

// GET route => to get all the products
router.get('/', (req, res, next) => {
  Product.find({})
    .then(response => res.json(response)) // all the products
    .catch(() => res.status(400).json({ message: 'Getting Products went wrong.' }));
});

// PUT route => to update a specific product
router.put('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified Product is not valid' });
  }

  Product.findOneAndUpdate({
    _id: req.params.id
  }, {
    available: req.body.available
  })
  .then(() => res.json({ message: 'Product was updated successfully.' }))
  .catch(() => res.status(400).json({ message: 'Updating Product went wrong.' }));
});

module.exports = router;