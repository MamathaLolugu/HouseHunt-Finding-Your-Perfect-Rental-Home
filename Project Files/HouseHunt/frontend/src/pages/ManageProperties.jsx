import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Box, IconButton, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { propertyAPI } from '../services/api';

const ManageProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await propertyAPI.getOwnerProperties();
            setProperties(response.data.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await propertyAPI.deleteProperty(id);
                setProperties(properties.filter(p => p._id !== id));
            } catch (error) {
                console.error('Error deleting property:', error);
                alert('Failed to delete property');
            }
        }
    };

    const handleToggleAvailability = async (property) => {
        try {
            await propertyAPI.updateProperty(property._id, {
                ...property,
                availability: !property.availability
            });
            setProperties(properties.map(p =>
                p._id === property._id ? { ...p, availability: !p.availability } : p
            ));
        } catch (error) {
            console.error('Error updating property:', error);
            alert('Failed to update property');
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Manage My Properties
            </Typography>

            {properties.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        You haven't added any properties yet
                    </Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Title</strong></TableCell>
                                <TableCell><strong>Location</strong></TableCell>
                                <TableCell><strong>Rent</strong></TableCell>
                                <TableCell><strong>Type</strong></TableCell>
                                <TableCell><strong>Bedrooms</strong></TableCell>
                                <TableCell><strong>Available</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {properties.map((property) => (
                                <TableRow key={property._id}>
                                    <TableCell>{property.title}</TableCell>
                                    <TableCell>{property.location}</TableCell>
                                    <TableCell>₹{property.rent}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize' }}>{property.propertyType}</TableCell>
                                    <TableCell>{property.bedrooms}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={property.availability}
                                            onChange={() => handleToggleAvailability(property)}
                                            color="success"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(property._id)}
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default ManageProperties;
