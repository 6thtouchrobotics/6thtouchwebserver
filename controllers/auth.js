const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendEmail } = require('../utils/email');

// Send magic link
const sendMagicLink = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(404).json(message, "provide an email address")
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ username: email.split('@')[0], email });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30m' });
    const magicLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?token=${token}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px 24px;">
          <h2 style="color: #2d3748;">Welcome to 6thTouch!</h2>
          <p style="color: #4a5568; font-size: 16px;">Hello,</p>
          <p style="color: #4a5568; font-size: 16px;">Click the button below to sign in to your account. This link will expire in 15 minutes for your security.</p>
          <a href="${magicLink}" style="display: inline-block; margin: 24px 0; padding: 12px 28px; background: #3182ce; color: #fff; border-radius: 4px; text-decoration: none; font-size: 16px; font-weight: bold;">Sign In to 6thTouch</a>
          <p style="color: #a0aec0; font-size: 13px;">If you did not request this email, you can safely ignore it.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
          <p style="color: #a0aec0; font-size: 12px;">&copy; ${new Date().getFullYear()} 6thTouch. All rights reserved.</p>
        </div>
      </div>
    `;
    await sendEmail(email, 'Your Magic Sign-In Link', emailHtml);
    res.json({ message: 'Magic link sent to your email.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
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
