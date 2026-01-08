import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const location = useLocation();
    if (!isAuthenticated) {
        // Redirect to login with return URL
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
