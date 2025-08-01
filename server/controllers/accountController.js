import Account from '../models/Account.js';

export const getAccount = async (req, res) => {
  try {
    const account = await Account.findByUserId(req.user.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};