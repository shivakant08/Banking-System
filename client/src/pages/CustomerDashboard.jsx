import { useState, useEffect } from 'react';
import { getTransactions, getAccountBalance } from '../services/transactionService';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import useAuth from '../hooks/useAuth';

const CustomerDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [transactionType, setTransactionType] = useState('');
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [transactionsData, balanceData] = await Promise.all([
                    getTransactions(token),
                    getAccountBalance(token)
                ]);
                setTransactions(transactionsData);
                setBalance(balanceData.balance);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [token]);

    const handleTransaction = (type) => {
        setTransactionType(type);
        setShowForm(true);
    };

    const handleTransactionComplete = (newTransaction) => {
        setTransactions([newTransaction, ...transactions]);
        setBalance(newTransaction.balance_after);
        setShowForm(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Welcome, {user?.username}</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
                <p className="text-3xl font-bold">${typeof balance === 'number' ? balance.toFixed(2) : '0.00'}</p>
            </div>
            
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => handleTransaction('deposit')}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                    Deposit
                </button>
                <button
                    onClick={() => handleTransaction('withdrawal')}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                    Withdraw
                </button>
            </div>
            
            <TransactionList transactions={transactions} />
            
            {showForm && (
                <TransactionForm
                    type={transactionType}
                    balance={balance}
                    onComplete={handleTransactionComplete}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default CustomerDashboard;