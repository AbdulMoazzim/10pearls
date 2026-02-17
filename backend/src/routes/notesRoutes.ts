import { Router } from 'express';
import { body, param } from 'express-validator';
import { protect } from '../middlewares/authMiddleware';
import notesController from '../controllers/notesController';
import { validate } from '../middlewares/validationMiddleware';

const router = Router();

router.use(protect);

// Validation rules
const createNoteValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title cannot exceed 255 characters'),
  body('content').optional(),
];

const updateNoteValidation = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Title cannot exceed 255 characters'),
  body('content').optional(),
];

const noteIdValidation = [
  
  param('id').isMongoId().withMessage('Invalid note ID'),
];

// Routes
router.get('/', notesController.getAllNotes);
router.get('/search', notesController.searchNotes);
router.get('/:id', validate(noteIdValidation), notesController.getNoteById);
router.post('/', validate(createNoteValidation), notesController.createNote);
router.put('/:id', validate([ ...updateNoteValidation]), notesController.updateNote);
router.delete('/:id', validate(noteIdValidation), notesController.deleteNote);

export default router;