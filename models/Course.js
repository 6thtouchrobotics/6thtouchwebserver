const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Duration in minutes'
    },
    level: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
        allowNull: false,
        defaultValue: 'beginner',
        comment: 'Level of the course'
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
        comment: 'Price of the course'
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'URL of the course image'
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'URL of the course link'
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Indicates if the course is published'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Date of the course'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Creation date of the course'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Last update date of the course'
    }

}, {
  timestamps: true
});

module.exports = Course;
