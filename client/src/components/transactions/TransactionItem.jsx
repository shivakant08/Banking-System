const TransactionItem = ({ transaction }) => {
  const isDeposit = transaction.type === 'deposit';
  const amount = Number(transaction.amount) || 0;
  const balanceAfter = Number(transaction.balance_after) || 0;

  return (
    <div className="border-b pb-2 last:border-b-0">
      <div className="flex justify-between">
        <span className="font-medium">
          {transaction.username || 'System'} - {new Date(transaction.created_at).toLocaleString()}
        </span>
        <span className={`font-bold ${isDeposit ? 'text-green-500' : 'text-red-500'}`}>
          {isDeposit ? '+' : '-'}${amount.toFixed(2)}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        Balance after: ${balanceAfter.toFixed(2)}
      </div>
    </div>
  );
};

export default TransactionItem;