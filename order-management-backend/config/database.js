const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // เปลี่ยนเป็น 'postgres', 'sqlite', หรือ 'mssql' หากใช้ฐานข้อมูลอื่น
    logging: false,
});

module.exports = sequelize;

