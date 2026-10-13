import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import propertiesRoutes from './routes/propertiesRoutes.js';
import agentsRoutes from './routes/agentsRoutes.js';
import appointmentsRoutes from './routes/appointmentsRoutes.js';
import inquiriesRoutes from './routes/inquiriesRoutes.js';
import chatsRoutes from './routes/chatsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'TerraPlots & Middleman Agent Backend API'
  });
});

// API Routes
app.use('/api/properties', propertiesRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/chats', chatsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`🚀 TerraPlots Backend API running at http://localhost:${PORT}`);
  console.log(`📡 Healthcheck available at http://localhost:${PORT}/api/health`);
});
