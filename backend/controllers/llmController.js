const axios = require('axios');
const User = require('../models/userModel');
const { mockLLMResponse } = require('../utils/llmMock');

exports.getLLMResponse = async (req, res) => {
  const { recipientId, message } = req.body;
  try {
    const recipient = await User.findById(recipientId);
    if (recipient.status === 'BUSY') {
      const response = await Promise.race([
        axios.post('https://api.example.com/llm', { message }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
      ]);
      res.json(response.data);
    } else {
      res.status(400).json({ message: 'Recipient is not busy' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};