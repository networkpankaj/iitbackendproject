const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { getLLMResponse } = require('./controllers/llmController');
const { mockLLMResponse } = require('./utils/llmMock');
const Message = require('./models/messageModel');
const User = require('./models/userModel');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.post('/api/llm', getLLMResponse);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
    const { sender, recipient, content } = data;
    // Save message to database
    const message = await Message.create({ sender, recipient, content });
    io.to(recipient).emit('receiveMessage', message);

    // Handle LLM response if recipient is busy
    const recipientUser = await User.findById(recipient);
    if (recipientUser.status === 'BUSY') {
      const llmResponse = await mockLLMResponse(content);
      io.to(sender).emit('receiveMessage', {
        sender: recipient,
        recipient: sender,
        content: llmResponse.response
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

mongoose.connect('mongodb://localhost:27017/chatiit', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  server.listen(5000, () => {
    console.log('Server running on port 5000');
  });
}).catch(err => {
  console.error(err);
});