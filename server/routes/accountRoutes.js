import { Router } from 'express';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import { getAccount, getAllAccounts } from '../controllers/accountController.js';

const router = Router();
router.get('/', auth, getAccount);
router.get('/all', auth, role('banker'), getAllAccounts);

export default router;