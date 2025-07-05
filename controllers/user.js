"use strict";
const User = require('../models/user');

const getUser = async (req, res) => {
    const id  = req.user.id;
    if (!id)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const user = await User.findOne({ where: { id }  });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching user: ${error.message}` });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ message: 'User ID is required' });
    try {
        const user = await User.findOne({ where: { id }  });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching user: ${error.message}` });
    }
};

const updateUser = async (req, res) => {
    const { username } = req.body;
    const userId = req.user.id;
    if (!userId)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        user.set('username', username);
        await user.save();
        return res.json({ message: 'Username updated', user });
    }
    catch (error) {
        return res.status(500).json({ message: `Error updating user: ${error.message}` });
    }
};

module.exports = { getUser, getUserById, updateUser };
