"use strict";
const EnrolledCourse = require('../models/userCourse');

const getAllEnrolledCourse = async (req, res) => {
    try {
        const course = await EnrolledCourse.findAll({ order: [['createdAt', 'DESC']] });
        if (course.length === 0)
            return res.status(404).json({ message: 'No course Enrolled' });
        return res.json(course);
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching Courses: ${error.message}` });
    }
};

const getEnrolledCourseById = async (req, res) => {
    const { courseId } = req.params;
    if (!courseId)
        return res.status(400).json({ message: 'Course ID is required' });
    try {
        const course = await Course.findOne({ where: { courseId }  });
        if (course.length === 0)
            return res.status(404).json({ message: 'Course not Avialable' });
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching Course: ${error.message}` });
    }
};

const addEnrolledCourse = async (req, res) => {
    const {  title, description, duration, level, price} = req.body;
    if (!title || !description || !duration || !level || !price)
        return res.status(400).json({ message: 'All fields are required' });
    try {
        const result = await Course.create({title, description, duration, level, price });
        return res.status(201).json({ message: 'Course created successfully', course: result });
    }catch (error) {
        return res.status(500).json({ message: `Error updating user: ${error.message}` });
    }
};

module.exports = { getAllEnrolledCourse, getEnrolledCourseById, addEnrolledCourse };