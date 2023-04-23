import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('OK');
});

userRouter.get('/:id', (req, res) => {
  res.send('OK');
});

userRouter.post('/', (req, res) => {
  res.send('OK');
});

userRouter.put('/:id', (req, res) => {
  res.send('OK');
});

userRouter.delete('/:id', (req, res) => {
  res.send('OK');
});

export default userRouter;
