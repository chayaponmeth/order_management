// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getProductsController, createProductController, updateProductController, deleteProductController } = require('../controllers/productController');

router.get('/', getProductsController);
router.post('/', createProductController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);

module.exports = router;
