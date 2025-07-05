const express = require('express');
const router = express.Router();
const { sendMagicLink, verifyMagicLink } = require('../controllers/auth');
const { getUser, getUserById, updateUser } = require('../controllers/user');
const { getAllCourse, getCourseById, addCourse } = require('../controllers/course');
const { authenticate } = require('../middleware/middleware');
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
  return router;
};

module.exports = { routers };
