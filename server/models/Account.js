import pool from '../config/db.js';

class Account {
  static async findByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM Accounts WHERE user_id = ?', [userId]);
    return rows[0];
  }

  static async create(userId) {
    const [result] = await pool.query(
      'INSERT INTO Accounts (user_id, balance) VALUES (?, 0)',
      [userId]
    );
    return result.insertId;
  }

  static async updateBalance(accountId, amount) {
    await pool.query(
      'UPDATE Accounts SET balance = balance + ? WHERE id = ?',
      [amount, accountId]
    );
  }

  static async getAll() {
    const [rows] = await pool.query(`
      SELECT a.id, a.balance, u.username, u.full_name, u.role 
      FROM Accounts a
      JOIN Users u ON a.user_id = u.id
    `);
    return rows;
  }
}

export default Account;