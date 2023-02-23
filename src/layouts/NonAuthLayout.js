import { Navigate, Outlet } from 'react-router-dom';

import { RoutePaths } from 'routes/route-constants';
import './NonAuthLayout.scss'

const NonAuthLayout = ({ isAuthenticated, children }) => {
    if (isAuthenticated) {
        console.log('....')
        return <Navigate to={RoutePaths.HOME} replace />;
    }

    return (
        <div className="nonAuth-layout">
            {children}
            <Outlet />
        </div>
    );
};

export default NonAuthLayout;
