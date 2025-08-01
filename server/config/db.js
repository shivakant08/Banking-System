import mysql from 'mysql2/promise';
import 'dotenv/config';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'Bank',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create the pool
const pool = mysql.createPool(dbConfig);

// Test the connection
async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Successfully connected to the database');
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

// Call the test function
testConnection().catch(err => {
  console.error('Connection test failed:', err);
  process.exit(1);
});

export default pool;