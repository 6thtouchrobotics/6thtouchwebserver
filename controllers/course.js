"use strict";
const Course = require('../models/course');

const getAllCourse = async (req, res) => {
    try {
        const course = await Course.findAll({ order: [['createdAt', 'DESC']] });
        if (!course)
            return res.status(404).json({ message: 'No course Avialable' });
        return res.json(course);
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching Courses: ${error.message}` });
    }
};

const getCourseById = async (req, res) => {
    const { courseId } = req.params;
    if (!courseId)
        return res.status(400).json({ message: 'Course ID is required' });
    try {
        const user = await Course.findOne({ where: { courseId }  });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching user: ${error.message}` });
    }
};

// const addCourse = async (req, res) => {
//     const {  } = req.body;
//     const userId = req.user.id;
//     if (!userId)
//         return res.status(401).json({ message: 'Unauthorized' });
//     try {
//         const user = await User.findOne({ where: { id: userId } });
//         if (!user)
//             return res.status(404).json({ message: 'User not found' });
//         user.set('username', username);
//         await user.save();
//         return res.json({ message: 'Username updated', user });
//     }
//     catch (error) {
//         return res.status(500).json({ message: `Error updating user: ${error.message}` });
//     }
// };

module.exports = { getAllCourse, getCourseById };