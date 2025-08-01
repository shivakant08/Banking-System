import { Router } from 'express';
import { login } from '../controllers/authController.js';

const router = Router();

// Make sure this route exists
router.post('/login', login); // This handles both customer and banker login

export default router;