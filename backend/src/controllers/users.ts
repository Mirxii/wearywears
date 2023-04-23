import prisma from '../db/prismaClient';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

export const getAllUsers = async (req: Request, res: Response) => {
  const users: User[] = await prisma.user.findMany();

  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: String(id),
    },
  });

  res.json(user);
};
