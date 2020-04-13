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

// GET route => to get a specific product/detailed view
router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findById(req.params.id)
    .then(response => { // a specific product
      res.status(200).json(response);
    })
    .catch(err => res.json(err));
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

// POST route => to create a new project ==> PROTECT ROUTE
router.post('/', (req, res, next) => {
  const { productData } = req.body;
  Product.create(productData)
  .then(response => {
    res.json(response);
  })
  .catch(err => res.json(err));
});

// DELETE route => to delete a specific project ==> PROTECT ROUTE
router.delete('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Product was removed successfully.` });
    })
    .catch(err =>  res.json(err));
});

module.exports = router;