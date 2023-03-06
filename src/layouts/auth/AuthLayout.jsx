import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './AuthLayout.scss';
import Header from 'containers/header/Header';
import { EAuthToken } from 'variables';
import { RoutePaths } from 'routes/route-constants';
import { getMyProfileThunk } from 'stores/userSlice';

const AuthLayout = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem(EAuthToken.ACCESS_TOKEN);

  useEffect(() => {
    dispatch(getMyProfileThunk());
  }, [dispatch]);

  if (!accessToken) {
    return <Navigate to={RoutePaths.SIGN_IN} replace />;
  }
  return (
    <div className="Auth-layout">
      <div className="tab-header">
        <Header />
      </div>
      <div style={{ margin: '40px 0' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
