import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getDashboardLink = () => {
        if (!user) return '/';
        switch (user.role) {
            case 'renter':
                return '/renter/dashboard';
            case 'owner':
                return '/owner/dashboard';
            case 'admin':
                return '/admin/dashboard';
            default:
                return '/';
        }
    };

    return (
        <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Toolbar>
                <Typography variant="h5" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
                    🏠 HouseHunt
                </Typography>

                <Box>
                    {user ? (
                        <>
                            <Button color="inherit" component={Link} to={getDashboardLink()}>
                                Dashboard
                            </Button>
                            <Button color="inherit" component={Link} to="/properties">
                                Properties
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout ({user.name})
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
