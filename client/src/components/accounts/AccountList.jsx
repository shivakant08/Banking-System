import AccountItem from './AccountItem';
import { useNavigate } from 'react-router-dom';

const AccountList = ({ accounts }) => {
    const navigate = useNavigate();

    const handleAccountClick = (accountId) => {
        navigate(`/account/${accountId}`);
    };

    return (
        <div className="space-y-2">
            {accounts.length === 0 ? (
                <p>No accounts found</p>
            ) : (
                accounts.map(account => (
                    <AccountItem 
                        key={account.id} 
                        account={account} 
                        onClick={() => handleAccountClick(account.id)}
                    />
                ))
            )}
        </div>
    );
};

export default AccountList;