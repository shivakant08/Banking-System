const API_URL = 'http://localhost:5000/api/transactions';

export const getTransactions = async (token) => {
    const response = await fetch(`${API_URL}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
};

export const getAccountBalance = async (token) => {
    const response = await fetch('http://localhost:5000/api/accounts', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
};

export const deposit = async (amount, token) => {
    const response = await fetch(`${API_URL}/deposit`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount })
    });
    return await response.json();
};

export const withdraw = async (amount, token) => {
    const response = await fetch(`${API_URL}/withdraw`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount })
    });
    return await response.json();
};