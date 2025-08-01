import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
                <p>No transactions found</p>
            ) : (
                <div className="space-y-4">
                    {transactions.map(transaction => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;