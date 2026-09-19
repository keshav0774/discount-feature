import express from 'express';
import discountRoutes from './routes/discountRoutes.js';
export const app = express();
app.use(express.json());
app.get('/health', (_req, res) => res.json({ success: true }));
app.use('/discount', discountRoutes);
app.use((error, _req, res, _next) => {
  if (error.name === 'CastError') return res.status(400).json({ success: false, message: 'Invalid identifier' });
  res.status(error.statusCode || 500).json({ success: false, message: error.message || 'Internal server error' });
});
