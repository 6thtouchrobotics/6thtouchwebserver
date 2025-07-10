"use strict";
const Topic = require('../models/Topic');
const Course = require('../models/Course');

const getAllTopics = async (req, res) => {
    const { courseId } = req.query;
    if (!courseId)
        return res.status(400).json({ message: 'Course ID is required' });
    try {
        const topics = await Topic.findAll({ where: { courseId }, include: {model: Course}, order: [['createdAt', 'DESC']] });
        if (topics.length === 0)
            return res.status(404).json({ message: 'No topics available' });
        return res.json(topics);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching topics: ${error.message}` });
    }
}

const getTopicById = async (req, res) => {
    const { topicId } = req.params;
    if (!topicId)
        return res.status(400).json({ message: 'Topic ID is required' });
    try {
        const topic = await Topic.findOne({ where: { id: topicId } });
        if (!topic)
            return res.status(404).json({ message: 'Topic not found' });
        return res.json(topic);
    } catch (error) {
        return res.status(500).json({ message: `Error fetching topic: ${error.message}` });
    }
}

const addTopic = async (req, res) => {
    const { courseId, title, content } = req.body;
    if (!courseId || !title)
        return res.status(400).json({ message: 'Course ID and title are required' });
    try {
        const topic = await Topic.create({ courseId, title, content });
        return res.status(201).json({ message: 'Topic created successfully', topic });
    } catch (error) {
        return res.status(500).json({ message: `Error creating topic: ${error.message}` });
    }
}

module.exports = { getAllTopics, getTopicById, addTopic };