const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const { protect } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/send', protect, sendMessage);
router.get('/messages/:userId1/:userId2', protect, getMessages);

module.exports = router;