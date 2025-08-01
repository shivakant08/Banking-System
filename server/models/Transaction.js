import pool from '../config/db.js';

class Transaction {
  static async create(accountId, amount, type, balanceAfter) {
    const [result] = await pool.query(
      'INSERT INTO Transactions (account_id, amount, type, balance_after) VALUES (?, ?, ?, ?)',
      [accountId, amount, type, balanceAfter]
    );
    return result.insertId;
  }

  static async findByAccountId(accountId) {
    const [rows] = await pool.query(
      'SELECT * FROM Transactions WHERE account_id = ? ORDER BY created_at DESC',
      [accountId]
    );
    return rows;
  }

  static async getAll() {
    const [rows] = await pool.query(`
      SELECT t.*, u.username, u.full_name 
      FROM Transactions t
      JOIN Accounts a ON t.account_id = a.id
      JOIN Users u ON a.user_id = u.id
      ORDER BY t.created_at DESC
    `);
    return rows;
  }
}

export default Transaction;