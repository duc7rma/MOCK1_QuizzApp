import { Outlet } from 'react-router-dom';

import './AuthLayout.scss';
import Header from 'containers/header/Header';

const AuthLayout = ({ children }) => {
  return (
    <div className="Auth-layout">
      {/* {children} */}
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
