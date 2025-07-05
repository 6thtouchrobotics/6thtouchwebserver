const express = require('express');
const router = express.Router();
const { sendMagicLink, verifyMagicLink } = require('../controllers/auth');
const { getUser, getUserById, updateUser } = require('../controllers/user');
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
  router.put('/api/user', authenticate, updateUser);
  return router;
};

module.exports = { routers };
