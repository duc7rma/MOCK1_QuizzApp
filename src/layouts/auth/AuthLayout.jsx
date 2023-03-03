import { Navigate, Outlet } from 'react-router-dom';

import './AuthLayout.scss';
import Header from 'containers/header/Header';
import { EAuthToken } from 'variables';
import { RoutePaths } from 'routes/route-constants';

const AuthLayout = () => {
  const accessToken = localStorage.getItem(EAuthToken.ACCESS_TOKEN);

  if (!accessToken) {
    return <Navigate to={RoutePaths.SIGN_IN} replace />;
  }
  return (
    <div className="Auth-layout">
      <div className="tab-header">
        <Header />
      </div>
      <div style={{ marginTop: '40px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
