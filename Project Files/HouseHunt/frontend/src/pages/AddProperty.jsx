import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Alert, Grid, FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { propertyAPI } from '../services/api';

const AddProperty = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        rent: '',
        propertyType: 'flat',
        bedrooms: '',
        bathrooms: '',
        amenities: [],
        images: []
    });
    const [amenityInput, setAmenityInput] = useState('');
    const [imageInput, setImageInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddAmenity = () => {
        if (amenityInput.trim()) {
            setFormData({ ...formData, amenities: [...formData.amenities, amenityInput.trim()] });
            setAmenityInput('');
        }
    };

    const handleRemoveAmenity = (index) => {
        setFormData({
            ...formData,
            amenities: formData.amenities.filter((_, i) => i !== index)
        });
    };

    const handleAddImage = () => {
        if (imageInput.trim()) {
            setFormData({ ...formData, images: [...formData.images, imageInput.trim()] });
            setImageInput('');
        }
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await propertyAPI.addProperty(formData);
            setSuccess('Property added successfully!');
            setTimeout(() => {
                navigate('/owner/properties');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add property');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Add New Property
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Property Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Monthly Rent (₹)"
                                name="rent"
                                type="number"
                                value={formData.rent}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required>
                                <InputLabel>Property Type</InputLabel>
                                <Select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    label="Property Type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="house">House</MenuItem>
                                    <MenuItem value="flat">Flat</MenuItem>
                                    <MenuItem value="room">Room</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Bedrooms"
                                name="bedrooms"
                                type="number"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Bathrooms"
                                name="bathrooms"
                                type="number"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>Amenities</Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Add amenity (e.g., WiFi, Parking)"
                                    value={amenityInput}
                                    onChange={(e) => setAmenityInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
                                />
                                <Button variant="outlined" onClick={handleAddAmenity}>Add</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {formData.amenities.map((amenity, index) => (
                                    <Chip
                                        key={index}
                                        label={amenity}
                                        onDelete={() => handleRemoveAmenity(index)}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>Images (URLs)</Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Add image URL"
                                    value={imageInput}
                                    onChange={(e) => setImageInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                                />
                                <Button variant="outlined" onClick={handleAddImage}>Add</Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {formData.images.map((image, index) => (
                                    <Chip
                                        key={index}
                                        label={`Image ${index + 1}`}
                                        onDelete={() => handleRemoveImage(index)}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    mt: 2
                                }}
                            >
                                {loading ? 'Adding Property...' : 'Add Property'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddProperty;
