import express from 'express';
import dotenv from 'dotenv';
import videoRoutes from './routes/video.route.js';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/final_videos', express.static('final_videos'));

// Routes
app.use('/api/videos', videoRoutes);

app.get('/', (req, res) => {
  res.send('Video Editor Backend API');
});

// Create folders if not exist
['uploads', 'final_videos'].forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
