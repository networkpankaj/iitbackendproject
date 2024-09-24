# Real-Time Chat Application Backend

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Routes

### User Authentication

- **POST /api/auth/register**
  - Request: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "token": "jwt_token" }`

- **POST /api/auth/login**
  - Request: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "token": "jwt_token" }`

### Chat Functionality

- **POST /api/chat/send**
  - Request: `{ "sender": "userId1", "recipient": "userId2", "content": "Hello!" }`
  - Response: `{ "message": { "sender": "userId1", "recipient": "userId2", "content": "Hello!", "timestamp": "2023-10-01T00:00:00Z" } }`

- **GET /api/chat/messages/:userId1/:userId2**
  - Response: `[ { "sender": "userId1", "recipient": "userId2", "content": "Hello!", "timestamp": "2023-10-01T00:00:00Z" }, ... ]`

### LLM Integration

- **POST /api/llm**
  - Request: `{ "recipientId": "userId2", "message": "Hello!" }`
  - Response: `{ "response": "Mock response to: Hello!" }`