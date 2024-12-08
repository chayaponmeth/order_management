const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Import Models
const Order = require('./order')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Customer = require('./customer')(sequelize, DataTypes);

// Define Relationships
Customer.hasMany(Order, { foreignKey: 'customerId', onDelete: 'CASCADE' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });

Product.hasMany(Order, { foreignKey: 'productId', onDelete: 'CASCADE' });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    sequelize,
    Order,
    Product,
    Customer,
};