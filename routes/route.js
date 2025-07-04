const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/middleware');
const { sendMagicLink, verifyMagicLink } = require('../controllers/auth');
const { getUser, getUserById, updateUser } = require('../controllers/user');
const { getAllCourse, getCourseById, addCourse } = require('../controllers/course');
const { getAllTopics, getTopicById, addTopic } = require('../controllers/topics');
const routers = () => {
  router.get
('/', (req, res) => {
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
  return router;
};

module.exports = { routers };
