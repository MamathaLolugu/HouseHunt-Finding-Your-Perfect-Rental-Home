import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import { propertyAPI } from '../services/api';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchProperties();
    }, [filters]);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const params = {};

            if (filters.location) params.location = filters.location;
            if (filters.minRent) params.minRent = filters.minRent;
            if (filters.maxRent && filters.maxRent < 100000) params.maxRent = filters.maxRent;
            if (filters.propertyType) params.propertyType = filters.propertyType;
            if (filters.bedrooms) params.bedrooms = filters.bedrooms;

            const response = await propertyAPI.getAllProperties(params);
            setProperties(response.data.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Browse Properties
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <FilterSidebar onFilterChange={handleFilterChange} />
                </Grid>

                <Grid item xs={12} md={9}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress />
                        </Box>
                    ) : properties.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Typography variant="h6" color="text.secondary">
                                No properties found matching your criteria
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {properties.map((property) => (
                                <Grid item xs={12} sm={6} lg={4} key={property._id}>
                                    <PropertyCard property={property} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default PropertyList;
