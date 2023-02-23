import { Navigate, Outlet } from "react-router-dom";

import { EAuthToken } from "variables";
import { RoutePaths } from './route-constants';

const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem(EAuthToken.ACCESS_TOKEN);



    if (!accessToken) {
        return <Navigate to={RoutePaths.SIGN_IN} replace />;
    }

    return (
        <div className="nonAuth-layout">
            {children}
            <Outlet />
        </div>
    );
}

export default ProtectedRoute;