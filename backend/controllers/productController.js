// backend/controllers/productController.js
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../models/productModel');

const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProductController = async (req, res) => {
  try {
    const product = req.body;
    const result = await createProduct(product);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const result = await updateProduct(id, product);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProduct(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProductsController, createProductController, updateProductController, deleteProductController };
