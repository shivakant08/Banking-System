import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.getAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deposit = async (req, res) => {
  const { amount } = req.body;
  
  try {
    const account = await Account.findByUserId(req.user.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    
    await Account.updateBalance(account.id, amount);
    const newBalance = parseFloat(account.balance) + parseFloat(amount);
    
    const transactionId = await Transaction.create(
      account.id,
      amount,
      'deposit',
      newBalance
    );
    
    res.json({
      id: transactionId,
      amount,
      type: 'deposit',
      balance_after: newBalance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const withdraw = async (req, res) => {
  const { amount } = req.body;
  
  try {
    const account = await Account.findByUserId(req.user.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    
    if (account.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    
    await Account.updateBalance(account.id, -amount);
    const newBalance = parseFloat(account.balance) - parseFloat(amount);
    
    const transactionId = await Transaction.create(
      account.id,
      amount,
      'withdrawal',
      newBalance
    );
    
    res.json({
      id: transactionId,
      amount,
      type: 'withdrawal',
      balance_after: newBalance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};