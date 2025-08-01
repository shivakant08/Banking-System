import { useState, useEffect } from 'react';
import AccountList from '../components/accounts/AccountList';
import { getAllAccounts } from '../services/accountService';
import  useAuth  from '../hooks/useAuth';

const BankerDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAllAccounts();
                setAccounts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                setLoading(false);
            }
        };
        fetchAccounts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Banker Dashboard</h1>
            <h2 className="text-xl font-semibold mb-4">Welcome, {user?.username}</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Customer Accounts</h3>
                <AccountList accounts={accounts} />
            </div>
        </div>
    );
};

export default BankerDashboard;