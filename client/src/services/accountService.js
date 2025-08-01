const API_URL = 'http://localhost:5000/api/accounts';

export const getAccountBalance = async (token) => {
    const response = await fetch(`${API_URL}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
};

export const getAllAccounts = async (token) => {
    const response = await fetch(`${API_URL}/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
};