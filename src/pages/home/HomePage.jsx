import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getMyProfileThunk } from 'stores/userSlice';
import './HomPage.scss';

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfileThunk());
  }, [dispatch]);

  return (
    <div className="tab-container">
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
}
