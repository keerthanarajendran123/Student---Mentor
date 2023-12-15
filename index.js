import express from 'express';
import connectDB from './src/db/index.js';
import mentorRoutes from './src/routes/mentorRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// Route handler for the root URL
app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>');
});

app.use('/mentor', mentorRoutes);
app.use('/student', studentRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
