import { useState } from 'react';
import { deposit, withdraw } from '../../services/transactionService';
import useAuth from '../../hooks/useAuth';

const TransactionForm = ({ type, balance, onComplete, onClose }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Safely convert balance to number
  const currentBalance = typeof balance === 'number' ? balance : 
                        typeof balance === 'string' ? parseFloat(balance) || 0 : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (type === 'withdrawal' && numAmount > currentBalance) {
      setError('Insufficient funds');
      return;
    }
    
    try {
      const transaction = type === 'deposit' 
        ? await deposit(numAmount, token)
        : await withdraw(numAmount, token);
      onComplete(transaction);
    } catch (err) {
      setError('Transaction failed. Please try again.');
      console.error('Transaction error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">
          {type === 'deposit' ? 'Deposit' : 'Withdraw'} Funds
        </h2>
        <p className="mb-4">Current Balance: ${currentBalance.toFixed(2)}</p>
        
        {error && <div className="mb-4 text-red-500">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              className="w-full px-3 py-2 border rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;