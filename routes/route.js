const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/middleware');
const { sendMagicLink, verifyMagicLink } = require('../controllers/auth');
const { getUser, getUserById, updateUser } = require('../controllers/user');
const { getAllCourse, getCourseById, addCourse } = require('../controllers/course');
const { getAllTopics, getTopicById, addTopic } = require('../controllers/topics');
const { initiatePayment, verifyPayment } = require('../controllers/integratePayment');
const { getEnrolledCourseById, getUserEnrollments } = require('../controllers/userEnrollment');

router.get('/', (req, res) => {
    res.send('Welcome to the API');
});
router.post('/api/auth/magiclink', sendMagicLink);
router.get('/api/auth/verify', verifyMagicLink);
router.get('/api/user', authenticate, getUser);
router.get('/api/user/:id', authenticate, getUserById);
router.put('/api/user/update', authenticate, updateUser);
router.get('/api/course/all', authenticate, getAllCourse);
router.get('/api/course/:courseId', authenticate, getCourseById);
router.post('/api/course/add', addCourse);
router.get('/api/topic/:courseId/all', authenticate, getAllTopics);
router.get('/api/topic/:courseId', authenticate, getTopicById);
router.post('/api/topic/add', addTopic);
router.post('/api/payment/initiate', authenticate, initiatePayment);
router.post('/api/payment/verify', authenticate, verifyPayment);
router.get('/api/enrolled/course/all', authenticate, getUserEnrollments);
router.get('/api/enrolled/course/:courseId', authenticate, getEnrolledCourseById);

module.exports = { routers: router };
