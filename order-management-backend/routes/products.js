const express = require('express');
const { Product } = require('../models');
const router = express.Router();

// Create Product
router.post('/', async (req, res) => {
    const { name, price, stock } = req.body;
    try {
        const product = await Product.create({ name, price, stock });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Product
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    try {
        await Product.update({ name, price, stock }, { where: { id } });
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.destroy({ where: { id } });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
