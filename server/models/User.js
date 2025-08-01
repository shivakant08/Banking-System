import pool from '../config/db.js';

class User {
  static async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    return rows[0];
  }

  static async create({ username, email, password, role, full_name }) {
    const [result] = await pool.query(
      'INSERT INTO Users (username, email, password, role, full_name) VALUES (?, ?, ?, ?, ?)',
      [username, email, password, role, full_name]
    );
    return result.insertId;
  }
}

export default User;