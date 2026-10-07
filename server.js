import 'dotenv/config';
import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/health', (req, res) => {
  res.send('Backend is running!');
});

app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is missing. Add it to your .env file.');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas connected!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });