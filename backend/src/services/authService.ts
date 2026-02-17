import {sign} from 'jsonwebtoken';
import { LoginCredentials, SignupData } from '../types/types';
import User from '../models/User';
import logger from '../utils/logger';
import { HttpError } from '../utils/error';
import { env } from '../config/env';

class AuthService {
  // Generate JWT token
  private generateToken(id: string, email: string): string {
    return sign({ id, email }, env.JWT_SECRET, {
      expiresIn: 60*60
    });
  }

  // Register new user
  async signup(data: SignupData) {
    const { email, password, firstName, lastName } = data;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      logger.warn(`Signup attempt with existing email: ${email}`);
      throw new HttpError(400, 'Email already registered');
    }

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
    });
    console.log(user.errors)
    logger.info(`New user registered: ${user.email}`);

    // Generate token
    const token = this.generateToken(user._id.toString(), user.email);

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  // Login user
  async login(credentials: LoginCredentials) {
    const { email, password } = credentials;

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );

    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      throw new HttpError(401, 'Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      logger.warn(`Login attempt with deactivated account: ${email}`);
      throw new HttpError(401, 'Account is deactivated');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      logger.warn(`Failed login attempt for: ${email}`);
      throw new HttpError(401, 'Invalid email or password');
    }

    logger.info(`User logged in: ${user.email}`);

    // Generate token
    const token = this.generateToken(user._id.toString(), user.email);

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  // Get user profile
  async getProfile(userId: string) {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    };
  }

  // Update user profile
  async updateProfile(
    userId: string,
    data: { firstName?: string; lastName?: string; email?: string }
  ) {
    const user = await User.findById(userId);

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    // Update fields
    if (data.firstName) user.firstName = data.firstName;
    if (data.lastName) user.lastName = data.lastName;
    if (data.email) {
      // Check if email is already taken
      const existingUser = await User.findOne({
        email: data.email.toLowerCase(),
        _id: { $ne: userId },
      });
      if (existingUser) {
        throw new HttpError(400, 'Email already in use');
      }
      user.email = data.email.toLowerCase();
    }

    await user.save();

    logger.info(`User profile updated: ${user.email}`);

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}

export default new AuthService();