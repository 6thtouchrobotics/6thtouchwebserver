"use strict";
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Topic = require('../models/Topic');

const getEnrolledCourseById = async (req, res) => {
    const { courseId } = req.params;
    const id  = req.user.id;
    if (!courseId)
        return res.status(400).json({ message: 'Course ID is required' });
    try {
        const course = await Enrollment.findOne({ where: { userId: id, courseId },
        include: [{ model: Course }, { model: Topic }] });
        if (course.length === 0)
            return res.status(404).json({ message: 'Course not Avialable' });
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching Enrolled Course: ${error.message}` });
    }
};

const getUserEnrollments = async (req, res) => {
  const id  = req.user.id;
  try {
    const enrollments = await Enrollment.findAll({
      where: { userId: id },
      model: Course,
      include: [Topic]
    });
    return res.json(enrollments);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch enrolled courses', error: err.message });
  }
};


module.exports = { getEnrolledCourseById, getUserEnrollments };