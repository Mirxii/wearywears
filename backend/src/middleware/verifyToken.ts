import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.userId = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};
