const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendEmail } = require('../utils/email');

// Send magic link
const sendMagicLink = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ username: email.split('@')[0], email });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const magicLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?token=${token}`;
    await sendEmail(email, 'Your Magic Sign-In Link', `<p>Click <a href="${magicLink}">here</a> to sign in to your account. This link will expire in 15 minutes.</p>`);
    res.json({ message: 'Magic link sent to your email.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify magic link
const verifyMagicLink = async (req, res) => {
  const { token } = req.query;
  try {
    if (!token || typeof token !== 'string') return res.status(400).json({ message: 'unauthorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Authenticated', user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { sendMagicLink, verifyMagicLink };
