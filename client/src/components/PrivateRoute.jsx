// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to={user.role === 'banker' ? '/banker/dashboard' : '/customer/dashboard'} />;
    }
    
    return children;
};

export default PrivateRoute;