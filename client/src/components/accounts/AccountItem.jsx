const AccountItem = ({ account, onClick }) => {
    return (
        <div 
            className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={onClick}
        >
            <div className="flex justify-between">
                <div>
                    <h3 className="font-medium">{account.full_name}</h3>
                    <p className="text-sm text-gray-500">@{account.username}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold">${account.balance.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 capitalize">{account.role}</p>
                </div>
            </div>
        </div>
    );
};

export default AccountItem;