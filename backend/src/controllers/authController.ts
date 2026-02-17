import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import authService from '../services/authService';
import { AuthRequest } from '../types/types';

class AuthController {
  signup = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await authService.signup(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  });

  login = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  });

  getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await authService.getProfile(req.user!.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  });

  updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await authService.updateProfile(req.user!.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: result,
    });
  });
}

export default new AuthController();