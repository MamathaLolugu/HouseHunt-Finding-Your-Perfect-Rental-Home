import React, { useContext } from 'react';
import { Container, Typography, Grid, Paper, Button, Alert, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ListIcon from '@mui/icons-material/List';
import RequestPageIcon from '@mui/icons-material/RequestPage';

const OwnerDashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user.isApproved) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Alert severity="warning" sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Account Pending Approval
                    </Typography>
                    <Typography variant="body1">
                        Your account is waiting for admin approval. You will be able to add properties once your account is approved.
                    </Typography>
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Owner Dashboard
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
                        <AddHomeIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Add Property
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            List a new property for rent
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/owner/add-property"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                        >
                            Add New
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
                        <ListIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            My Properties
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Manage your listed properties
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/owner/properties"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                        >
                            View All
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
                        <RequestPageIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Booking Requests
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Review and manage booking requests
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/owner/booking-requests"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                        >
                            View Requests
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OwnerDashboard;
