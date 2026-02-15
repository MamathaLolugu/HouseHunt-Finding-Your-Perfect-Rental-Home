import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const RenterDashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Renter Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateY(-5px)' }
                        }}
                    >
                        <SearchIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Browse Properties
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Search and filter through available rental properties
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

                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateY(-5px)' }
                        }}
                    >
                        <BookmarksIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                            My Bookings
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            View and manage your booking requests
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/renter/bookings"
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            }}
                        >
                            View Bookings
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default RenterDashboard;
