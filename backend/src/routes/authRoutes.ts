import { Router } from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController';
import { validate } from '../middlewares/validationMiddleware';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Validation rules
const signupValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const updateProfileValidation = [
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
];

// Routes
router.post('/signup', validate(signupValidation), authController.signup);
router.post('/login', validate(loginValidation), authController.login);
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, validate(updateProfileValidation), authController.updateProfile);

export default router;