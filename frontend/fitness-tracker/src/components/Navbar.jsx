import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { Mail, Notifications, Pets } from '@mui/icons-material';
import {
    PlaylistAdd,
    Article,
    Checklist,
    Home,
    ModeNight,
    Settings,
    ControlPoint,
} from '@mui/icons-material';
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
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
} from '@mui/material';
const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const Search = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    padding: '0 10px',
    borderRadius: theme.shape.borderRadius,
    width: '40%',
}));

const Icons = styled(Box)(({ theme }) => ({
    display: 'none',
    alignItems: 'center',
    gap: '20px',
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
    },
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));
const Navbar = ({ isLoggedIn, handleLogout }) => {
    const [open, setOpen] = useState(false);
    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Typography
                    variant='h4'
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    TrackFit
                </Typography>
                <PlaylistAdd sx={{ display: { xs: 'block', sm: 'none' } }} />
                <ListItem
                    disablePadding
                    sx={{
                        marginRight: 10,
                        marginTop: 1,
                        width: 60,
                        height: 60,
                    }}
                >
                    <ListItemButton component='a' href='/'>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary='Homepage' />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{
                        marginRight: 100,
                        marginTop: 1,
                        width: 60,
                        height: 60,
                    }}
                >
                    <ListItemButton component='a' href='/about'>
                        <ListItemIcon>
                            <Article />
                        </ListItemIcon>
                        <ListItemText primary='About' />
                    </ListItemButton>
                </ListItem>

                <div className='mb-2'>
                    {isLoggedIn ? (
                        <>
                            <Icons>
                                <Avatar
                                    sx={{ marginTop: 1, width: 60, height: 60 }}
                                    src='https://ocdn.eu/pulscms-transforms/1/wqYk9kpTURBXy8wZjQ4ZTJlMWQ4YzQ3NzkwMDZlY2I0MzEyMDA5NDhjNS5qcGeSlQMAzQI8zQeUzQRDkwXNAujNAZ7eAAGhMAE'
                                    onClick={(e) => setOpen(true)}
                                />
                                <DropdownButton
                                    id={`dropdown-button-profile`}
                                    variant='primary'
                                    title={jwt(Cookies.get('jwtToken')).email}
                                >
                                    <Dropdown.Item as={Link} to='/profile'>
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        as={Link}
                                        to='/'
                                        onClick={handleLogout}
                                    >
                                        Sign out
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Icons>
                        </>
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
