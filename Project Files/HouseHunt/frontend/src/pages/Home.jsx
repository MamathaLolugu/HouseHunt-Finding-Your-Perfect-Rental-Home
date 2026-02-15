import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Home = () => {
    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                py: 10,
                textAlign: 'center'
            }}>
                <Container maxWidth="md">
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                        🏠 Find Your Perfect Rental Home
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                        Browse thousands of properties and find your dream home today
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/properties"
                            sx={{
                                bgcolor: 'white',
                                color: '#667eea',
                                '&:hover': { bgcolor: '#f0f0f0' }
                            }}
                        >
                            Browse Properties
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            component={Link}
                            to="/register"
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                            }}
                        >
                            Get Started
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 'bold' }}>
                    Why Choose HouseHunt?
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                            <HomeIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Wide Selection
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Browse through thousands of verified properties across multiple locations
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                            <SearchIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Easy Search
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Filter by location, price, bedrooms, and more to find exactly what you need
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                            <VerifiedUserIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    Verified Owners
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    All property owners are verified by our admin team for your safety
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Ready to Find Your Home?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                        Join thousands of happy renters who found their perfect home with HouseHunt
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/register"
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            px: 4
                        }}
                    >
                        Sign Up Now
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
