import { Router } from 'express';
import auth from '../middleware/auth.js';
import { getTransactions, deposit, withdraw } from '../controllers/transactionController.js';

const router = Router();
router.get('/', auth, getTransactions);
router.post('/deposit', auth, deposit);
router.post('/withdraw', auth, withdraw);

export default router;