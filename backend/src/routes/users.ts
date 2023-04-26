import express from 'express';

import { createUser, getAllUsers, getUserById } from '../controllers/users';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.put('/:id', (req, res) => {
  res.send('OK');
});

userRouter.delete('/:id', (req, res) => {
  res.send('OK');
});

export default userRouter;
