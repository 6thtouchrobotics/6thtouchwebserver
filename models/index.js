const sequelize = require('../config/database');
const User = require('./User');
const Course = require('./Course');
const Enrollment = require('./Enrollment');
const Topic = require('./Topic');
const Transaction = require('./Transaction');

// Define associations
User.hasMany(Enrollment, { foreignKey: 'userId' });
Enrollment.belongsTo(User, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Course.hasMany(Enrollment, { foreignKey: 'courseId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });
Transaction.belongsTo(Course, { foreignKey: 'courseId' });

Course.hasMany(Topic, { foreignKey: 'courseId' });
Topic.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = {
  sequelize,
  User,
  Course,
  Enrollment,
  Topic,
  Transaction
};
