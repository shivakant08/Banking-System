import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactions } from '../services/transactionService';
import TransactionList from '../components/transactions/TransactionList';

const AccountDetails = () => {
    const { accountId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                const filtered = data.filter(t => t.account_id == accountId);
                setTransactions(filtered);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [accountId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Account Transactions</h1>
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default AccountDetails;