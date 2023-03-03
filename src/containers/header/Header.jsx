import { useNavigate } from 'react-router-dom';

import { RoutePaths } from 'routes/route-constants';
import MyAvatar from './avatar/Avatar';
import TabsHeader from './tabs/Tabs';
import './Header.scss';

function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header_logo">
        <img
          alt=""
          style={{ borderRadius: '50%' }}
          width={60}
          src="https://apptraitsolutions.com/wp-content/uploads/2021/01/C88IZyEo7g-1.jpg"
          onClick={() => navigate(RoutePaths.HOME)}
        />
      </div>

      <TabsHeader />

      <MyAvatar />
    </div>
  );
}
export default Header;
