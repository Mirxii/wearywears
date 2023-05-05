import express from 'express';
import cors from 'cors';

import userRouter from './routes/users';
import listingRouter from './routes/listings';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'localhost:5173',
  })
);

app.use('/api/users', userRouter);
app.use('/api/listings', listingRouter);

app.get('/health', (req, res) => {
  res.send('OK');
});

export default app;
