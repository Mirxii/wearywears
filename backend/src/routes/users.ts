import express from 'express';

import { verifyToken } from '../middleware/verifyToken';

import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/users';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/signup', createUser);

userRouter.post('/login', loginUser);

userRouter.use(verifyToken);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;
