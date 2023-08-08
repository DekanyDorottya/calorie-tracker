import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { Mail, Notifications, Pets } from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    InputBase,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });
  
  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
  }));
  
  const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  }));
  
  const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  }));
  const Navbar = ({ isLoggedIn, handleLogout }) => {
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          TrackFit
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <div className='mb-2'>
                {isLoggedIn ? (
                    <DropdownButton
                        id={`dropdown-button-profile`}
                        variant='primary'
                        title={jwt(Cookies.get('jwtToken')).email}
                    >
                        <Dropdown.Item as={Link} to='/profile'>
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to='/' onClick={handleLogout}>
                            Sign out
                        </Dropdown.Item>
                    </DropdownButton>
                ) : (
                    <DropdownButton
                        id={`dropdown-button-login`}
                        variant='primary'
                        title={` Log In  `}
                    >
                        <Dropdown.Item as={Link} to='/login'>
                            Log in
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to='/signup'>
                            Sign up
                        </Dropdown.Item>
                    </DropdownButton>
                )}
            </div>
        
      </StyledToolbar>
      
    </AppBar>
        
    );
};

export default Navbar;
