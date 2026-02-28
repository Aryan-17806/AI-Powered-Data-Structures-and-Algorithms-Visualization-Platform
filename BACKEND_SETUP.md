# DSA Visualizer - Backend
[Back to main README](../README.md)

## Backend Setup

The backend is built with Node.js, Express, and MongoDB.

### Prerequisites
- Node.js 18+
- MongoDB 6+
- npm or yarn

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/dsa-visualizer
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OPENAI_API_KEY=your_openai_api_key_here
CORS_ORIGIN=http://localhost:3000
```

### Running the Server

**Development mode with auto-reload:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout

#### Data
- `GET /api/structures` - Get all data structures
- `GET /api/algorithms` - Get all algorithms

#### Simulation
- `POST /api/simulate/run` - Run algorithm simulation
- `POST /api/simulate/complexity` - Get complexity analysis
- `GET /api/simulate/sessions` - Get user's saved sessions
- `GET /api/simulate/sessions/:id` - Get specific session

#### AI Explanations
- `POST /api/explain/algorithm` - Get AI explanation of algorithm
- `POST /api/explain/complexity` - Get complexity explanation
- `POST /api/explain/question` - Ask question about algorithm

#### Utilities
- `GET /api/health` - Health check

### Testing

```bash
npm test
npm run test:watch
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/dsa-visualizer |
| JWT_SECRET | JWT signing secret | your_secret_key |
| JWT_EXPIRY | JWT token expiry | 7d |
| OPENAI_API_KEY | OpenAI API key for AI features | - |
| OPENAI_MODEL | OpenAI model to use | gpt-4 |
| CORS_ORIGIN | CORS allowed origin | http://localhost:3000 |
| MAX_SIMULATION_SIZE | Max input size for simulations | 10000 |
| MAX_RECURSION_DEPTH | Max recursion depth | 1000 |

### MongoDB Setup

#### Local Installation
1. Install MongoDB Community Edition
2. Start MongoDB service:
   - Windows: `mongod` in cmd
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

#### Using Docker
```bash
docker run -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:6
```

### Project Structure

```
backend/
├── src/
│   ├── app.js              # Express application setup
│   ├── controllers/         # Request handlers
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   │   ├── SimulationEngine.js
│   │   ├── AIService.js
│   │   └── AuthService.js
│   ├── models/             # MongoDB schemas
│   ├── middleware/         # Express middleware
│   └── utils/              # Utility functions
├── tests/                  # Test files
├── package.json
├── .env.example
└── Dockerfile
```

### Deployment

#### Using Docker
```bash
docker build -t dsa-visualizer-backend .
docker run -p 5000:5000 --env-file .env dsa-visualizer-backend
```

#### Using Docker Compose (from root directory)
```bash
docker-compose up -d
```

#### Manual Deployment
1. Install Node.js on server
2. Clone repository
3. Configure environment variables
4. Run `npm install`
5. Run `npm start`
6. Use PM2 for process management: `pm2 start src/app.js --name dsa-backend`

### API Usage Examples

#### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepass123",
    "confirmPassword": "securepass123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

#### Run Simulation
```bash
curl -X POST http://localhost:5000/api/simulate/run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "algorithm": "bubble-sort",
    "input": {
      "array": [64, 34, 25, 12, 22, 11, 90]
    }
  }'
```

#### Get AI Explanation
```bash
curl -X POST http://localhost:5000/api/explain/algorithm \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "bubble-sort"
  }'
```

### Troubleshooting

#### MongoDB Connection Error
- Ensure MongoDB is running: `mongosh` to connect
- Check `MONGODB_URI` in `.env`
- Default connection: `mongodb://localhost:27017/dsa-visualizer`

#### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

#### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Token expires after `JWT_EXPIRY` duration
- Include token in Authorization header: `Bearer <token>`

### Performance Tips

1. Use connection pooling with MongoDB
2. Enable field indexing for frequently queried fields
3. Implement caching for algorithm metadata
4. Use compression middleware for responses
5. Monitor API response times with logging

### Security Considerations

1. Never commit `.env` file with secrets
2. Use strong JWT_SECRET in production
3. Implement rate limiting for API endpoints
4. Validate all user inputs
5. Use HTTPS in production
6. Keep dependencies updated

