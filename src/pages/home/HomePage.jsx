import { Outlet } from 'react-router-dom';

import './HomPage.scss';

export default function HomePage() {
  return (
    <div className="tab-container">
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
}
