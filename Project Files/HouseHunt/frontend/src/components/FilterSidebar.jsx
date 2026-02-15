import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Slider
} from '@mui/material';

const FilterSidebar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        location: '',
        minRent: 0,
        maxRent: 100000,
        propertyType: '',
        bedrooms: ''
    });

    const handleChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const resetFilters = {
            location: '',
            minRent: 0,
            maxRent: 100000,
            propertyType: '',
            bedrooms: ''
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Filter Properties
            </Typography>

            <TextField
                fullWidth
                label="Location"
                value={filters.location}
                onChange={(e) => handleChange('location', e.target.value)}
                sx={{ mb: 2 }}
                size="small"
            />

            <Typography gutterBottom>Rent Range</Typography>
            <Slider
                value={[filters.minRent, filters.maxRent]}
                onChange={(e, newValue) => {
                    handleChange('minRent', newValue[0]);
                    handleChange('maxRent', newValue[1]);
                }}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                step={1000}
                sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                ₹{filters.minRent} - ₹{filters.maxRent}
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }} size="small">
                <InputLabel>Property Type</InputLabel>
                <Select
                    value={filters.propertyType}
                    label="Property Type"
                    onChange={(e) => handleChange('propertyType', e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="house">House</MenuItem>
                    <MenuItem value="flat">Flat</MenuItem>
                    <MenuItem value="room">Room</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }} size="small">
                <InputLabel>Bedrooms</InputLabel>
                <Select
                    value={filters.bedrooms}
                    label="Bedrooms"
                    onChange={(e) => handleChange('bedrooms', e.target.value)}
                >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4+</MenuItem>
                </Select>
            </FormControl>

            <Button
                variant="outlined"
                fullWidth
                onClick={handleReset}
                sx={{ mt: 1 }}
            >
                Reset Filters
            </Button>
        </Paper>
    );
};

export default FilterSidebar;
