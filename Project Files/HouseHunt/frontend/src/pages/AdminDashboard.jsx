import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

const AdminDashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Admin Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateY(-5px)' }
                        }}
                    >
                        <VerifiedUserIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Pending Owners
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Review and approve owner registrations
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/admin/pending-owners"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                        >
                            View Requests
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateY(-5px)' }
                        }}
                    >
                        <PeopleIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            All Users
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            View all registered users
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/properties"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                        >
                            View Users
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateY(-5px)' }
                        }}
                    >
                        <HomeWorkIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            All Properties
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Manage all property listings
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/properties"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                        >
                            View Properties
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminDashboard;
