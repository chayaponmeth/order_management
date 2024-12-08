const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Order } = require('../models');

// Schema สำหรับ Validation
const orderSchema = Joi.object({
    customerId: Joi.number().integer().required(),
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
    status: Joi.string().valid('pending', 'completed', 'cancelled').required(),
});

// สร้างคำสั่งซื้อใหม่
router.post('/', async (req, res) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create order', details: err.message });
    }
});

// อัปเดตคำสั่งซื้อโดย ID
router.put('/:id', async (req, res) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const updated = await Order.update(req.body, { where: { id: req.params.id } });
        if (!updated[0]) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order', details: err.message });
    }
});

module.exports = router;
