import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();

    const defaultImage = 'https://via.placeholder.com/400x250?text=Property+Image';

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
            }
        }}>
            <CardMedia
                component="img"
                height="200"
                image={property.images && property.images.length > 0 ? property.images[0] : defaultImage}
                alt={property.title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {property.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 18, mr: 0.5, color: '#666' }} />
                    <Typography variant="body2" color="text.secondary">
                        {property.location}
                    </Typography>
                </Box>

                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                    ₹{property.rent}/month
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip
                        icon={<BedIcon />}
                        label={`${property.bedrooms} Bed`}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        icon={<BathtubIcon />}
                        label={`${property.bathrooms} Bath`}
                        size="small"
                        variant="outlined"
                    />
                </Box>

                <Chip
                    label={property.propertyType}
                    size="small"
                    color="secondary"
                    sx={{ textTransform: 'capitalize', mb: 1 }}
                />

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {property.description?.substring(0, 100)}...
                </Typography>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/property/${property._id}`)}
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                        }
                    }}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;
