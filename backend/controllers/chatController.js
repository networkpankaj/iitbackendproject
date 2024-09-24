const Message = require('../models/messageModel');
const User = require('../models/userModel');

exports.sendMessage = async (req, res) => {
  const { sender, recipient, content } = req.body;
  try {
    const message = await Message.create({ sender, recipient, content });
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId1, recipient: userId2 },
        { sender: userId2, recipient: userId1 }
      ]
    }).sort('timestamp');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};