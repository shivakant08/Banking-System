import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { username, password } = req.body;
  
  console.log(`Login attempt: ${username}`); // Debug

  try {
    const [rows] = await pool.query(
      'SELECT id, username, password, role FROM Users WHERE username = ?', 
      [username.trim()]
    );

    if (rows.length === 0) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    console.log('Found user:', user.username); // Debug

    // Compare passwords
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    console.log('Password match result:', isMatch); // Debug

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ 
      success: true,
      token,
      role: user.role 
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login' });
  }
};