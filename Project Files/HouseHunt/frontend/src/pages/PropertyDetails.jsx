import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Box,
    Chip,
    Button,
    Paper,
    TextField,
    CircularProgress,
    Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { propertyAPI, bookingAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const PropertyDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        phone: '',
        message: '',
        moveInDate: ''
    });
    const [bookingSuccess, setBookingSuccess] = useState('');
    const [bookingError, setBookingError] = useState('');

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await propertyAPI.getPropertyById(id);
            setProperty(response.data.data);
        } catch (error) {
            console.error('Error fetching property:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            navigate('/login');
            return;
        }

        if (user.role !== 'renter') {
            setBookingError('Only renters can send booking requests');
            return;
        }

        try {
            const response = await bookingAPI.createBooking({
                ...bookingData,
                propertyId: id
            });
            setBookingSuccess('Booking request sent successfully!');
            setBookingData({ phone: '', message: '', moveInDate: '' });
            setBookingError('');
        } catch (error) {
            setBookingError(error.response?.data?.message || 'Failed to send booking request');
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!property) {
        return (
            <Container sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5">Property not found</Typography>
            </Container>
        );
    }

    const defaultImage = 'https://via.placeholder.com/800x500?text=Property+Image';

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box
                        component="img"
                        src={property.images && property.images.length > 0 ? property.images[0] : defaultImage}
                        alt={property.title}
                        sx={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 2, mb: 3 }}
                    />

                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {property.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon sx={{ mr: 1, color: '#666' }} />
                        <Typography variant="h6" color="text.secondary">
                            {property.location}
                        </Typography>
                    </Box>

                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
                        ₹{property.rent}/month
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Chip icon={<BedIcon />} label={`${property.bedrooms} Bedrooms`} />
                        <Chip icon={<BathtubIcon />} label={`${property.bathrooms} Bathrooms`} />
                        <Chip label={property.propertyType} color="secondary" sx={{ textTransform: 'capitalize' }} />
                        <Chip
                            label={property.availability ? 'Available' : 'Not Available'}
                            color={property.availability ? 'success' : 'error'}
                        />
                    </Box>

                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Description
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {property.description}
                    </Typography>

                    {property.amenities && property.amenities.length > 0 && (
                        <>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Amenities
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                {property.amenities.map((amenity, index) => (
                                    <Chip key={index} label={amenity} variant="outlined" />
                                ))}
                            </Box>
                        </>
                    )}

                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Owner Information
                    </Typography>
                    <Typography variant="body1">
                        Name: {property.ownerId?.name || 'N/A'}
                    </Typography>
                    <Typography variant="body1">
                        Email: {property.ownerId?.email || 'N/A'}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 80 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Interested in this property?
                        </Typography>

                        {bookingSuccess && <Alert severity="success" sx={{ mb: 2 }}>{bookingSuccess}</Alert>}
                        {bookingError && <Alert severity="error" sx={{ mb: 2 }}>{bookingError}</Alert>}

                        {user && user.role === 'renter' ? (
                            <form onSubmit={handleBookingSubmit}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    value={bookingData.phone}
                                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                    required
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    fullWidth
                                    label="Move-in Date"
                                    type="date"
                                    value={bookingData.moveInDate}
                                    onChange={(e) => setBookingData({ ...bookingData, moveInDate: e.target.value })}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    fullWidth
                                    label="Message (Optional)"
                                    multiline
                                    rows={3}
                                    value={bookingData.message}
                                    onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                                    sx={{ mb: 2 }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    }}
                                >
                                    Send Inquiry
                                </Button>
                            </form>
                        ) : (
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Please login as a renter to send booking requests
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    }}
                                >
                                    Login
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PropertyDetails;
