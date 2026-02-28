import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes.js';
import structureRoutes from './routes/structureRoutes.js';
import algorithmRoutes from './routes/algorithmRoutes.js';
import simulationRoutes from './routes/simulationRoutes.js';
import explanationRoutes from './routes/explanationRoutes.js';

// Import middleware
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(logger);

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/structures', structureRoutes);
app.use('/api/algorithms', algorithmRoutes);
app.use('/api/simulate', simulationRoutes);
app.use('/api/explain', explanationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// ===== DATABASE CONNECTION =====
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-visualizer';
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

// ===== SERVER START =====
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
});

export default app;
