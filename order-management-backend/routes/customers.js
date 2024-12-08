const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Customer } = require('../models');

// Schema สำหรับ Validation
const customerSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    address: Joi.string().max(255).optional(),
});

// สร้างลูกค้าใหม่
router.post('/', async (req, res) => {
    const { error } = customerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create customer', details: err.message });
    }
});

// อัปเดตรายละเอียดลูกค้าตาม ID
router.put('/:id', async (req, res) => {
    const { error } = customerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const updated = await Customer.update(req.body, { where: { id: req.params.id } });
        if (!updated[0]) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update customer', details: err.message });
    }
});

module.exports = router;
