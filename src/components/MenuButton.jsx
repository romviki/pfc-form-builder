import { Button, Link, Menu } from '@mui/material';
import { useState } from 'react';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

function MenuButton({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Link
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginRight: 1,
          color: 'unset',
        }}
      >
        <MoreVertTwoToneIcon />
      </Link>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {children}
      </Menu>
    </>
  );
}
export default MenuButton;
