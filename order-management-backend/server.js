const express = require('express');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

app.use(express.json());

// Routes
const ordersRoutes = require('./routes/orders');
const productsRoutes = require('./routes/products');
const customersRoutes = require('./routes/customers');

app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/customers', customersRoutes);

// Sync Database
sequelize.sync({ force: false }) // ใช้ `force: true` หากต้องการรีเซ็ตตารางทุกครั้ง (ระวังข้อมูลหาย)
    .then(() => {
        console.log('Database synced successfully!');
    })
    .catch(err => {
        console.error('Error syncing database:', err.message);
    });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
