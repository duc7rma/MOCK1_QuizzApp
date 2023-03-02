import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded';
import Typography from '@mui/material/Typography';

import MyAvatar from './avatar/Avatar';
import TabsHeader from './tabs/Tabs';
import './Header.scss';

function Header() {
  return (
    <div className="header">
      <div className="header_logo">
        <EmojiObjectsRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/home"
          sx={{
            mr: 10,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'blue',
            textDecoration: 'none',
            width: '100px',
          }}
        >
          QUIZZ
        </Typography>
      </div>

      <TabsHeader />

      <MyAvatar />
    </div>
  );
}
export default Header;
