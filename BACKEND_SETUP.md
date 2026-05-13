# Backend Setup Guide

## AI Sales Intelligence Backend API

This is a Node.js/Express backend for the AI Sales Intelligence application.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository** (if not already done):

```bash
git clone <repository-url>
cd AI-Sales-Intelligence
```

2. **Install dependencies**:

```bash
npm install
```

3. **Setup environment variables**:

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your configuration
# nano .env  (or use your preferred editor)
```

### Configuration

Edit the `.env` file with your settings:

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `DB_HOST`, `DB_PORT`, `DB_NAME`: Database settings
- `CORS_ORIGIN`: Frontend URL for CORS
- `API_KEY`: Your API key
- `SECRET_KEY`: Your secret key

### Running the Application

#### Development Mode (with auto-reload):

```bash
npm run dev
```

#### Production Mode:

```bash
npm start
```

The server will start and listen on the configured PORT (default: http://localhost:5000)

### API Endpoints

**Health Check:**

```bash
GET /health
# Response: { status: 'OK', timestamp: '2024-01-01T00:00:00Z' }
```

**API Health Check:**

```bash
GET /api/v1/health
# Response: { success: true, message: 'API is running', version: '1.0.0' }
```

### Project Structure

```
src/
├── server.js              # Main server file
├── config/
│   └── config.js         # Configuration management
├── middleware/
│   └── errorHandler.js   # Error handling middleware
├── routes/
│   └── api.js            # API routes
├── controllers/
│   └── homeController.js # Controller example
└── utils/
    └── logger.js         # Logger utility
```

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Adding New Routes

1. Create a controller in `src/controllers/`
2. Import the controller in `src/routes/api.js`
3. Define your routes

Example:

```javascript
const { getUsers } = require('../controllers/userController');

router.get('/v1/users', getUsers);
router.post('/v1/users', createUser);
```

### Middleware

- **Helmet**: Security headers
- **CORS**: Cross-origin requests
- **Morgan**: HTTP request logging
- **Body Parser**: JSON/URL-encoded parsing

### Error Handling

All errors are caught by the error handler middleware and return a consistent response format:

```json
{
  "success": false,
  "error": {
    "status": 500,
    "message": "Error message",
    "stack": "Stack trace (development only)"
  }
}
```

### Logging

Logs are stored in `logs/app.log` and also displayed in console.

- INFO: General information
- ERROR: Error messages
- WARN: Warnings
- DEBUG: Debug messages (development only)

### Troubleshooting

**Port already in use:**

```bash
# Change PORT in .env file or use:
PORT=3001 npm run dev
```

**Module not found:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Next Steps

1. Set up your database connection
2. Create database models/schemas
3. Add authentication middleware
4. Create API endpoints for your features
5. Add input validation
6. Add comprehensive testing

---

For more information, see the main [README.md](README.md)
