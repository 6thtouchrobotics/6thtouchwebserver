const { Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/database')

const Transaction = sequelize.define('Transaction', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users', // Assuming you have a User model
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Courses', // Assuming you have a Course model
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'NGN'
    },
    status: {
        type: DataTypes.ENUM('pending', 'successful', 'failed'),
        allowNull: false,
        defaultValue: 'pending'
    },  
    tx_ref: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true,
    tableName: 'transactions',
    underscored: true
})

module.exports = Transaction;