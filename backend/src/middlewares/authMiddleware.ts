import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/types';
import { HttpError } from '../utils/error';
import logger from '../utils/logger';
import User from '../models/User';

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new HttpError(401, 'Not authorized, no token provided');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
      id: string;
      email: string;
    };

    // Check if user still exists
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new HttpError(401, 'User no longer exists');
    }

    if (!user.isActive) {
      throw new HttpError(401, 'User account is deactivated');
    }

    // Attach user to request
    req.user = {
      id: user._id.toString(),
      email: user.email,
    };

    logger.info(`User ${user.email} authenticated successfully`);
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      next(new HttpError(401, 'Invalid token'));
    } else if (error.name === 'TokenExpiredError') {
      next(new HttpError(401, 'Token expired'));
    } else {
      next(error);
    }
  }
};