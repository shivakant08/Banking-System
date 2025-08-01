import {  Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import BankerLogin from './components/auth/BankerLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import BankerDashboard from './pages/BankerDashboard';
import AccountDetails from './pages/AccountDetails';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <AuthProvider>
            
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/banker/login" element={<BankerLogin />} />
                    
                    <Route path="/customer/dashboard" element={
                        <PrivateRoute allowedRoles={['customer']}>
                            <CustomerDashboard />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/banker/dashboard" element={
                        <PrivateRoute allowedRoles={['banker']}>
                            <BankerDashboard />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/account/:accountId" element={
                        <PrivateRoute allowedRoles={['banker']}>
                            <AccountDetails />
                        </PrivateRoute>
                    } />
                    
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            
        </AuthProvider>
    );
};

export default App;