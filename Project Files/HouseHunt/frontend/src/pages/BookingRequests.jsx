import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, CircularProgress, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { bookingAPI } from '../services/api';

const BookingRequests = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await bookingAPI.getOwnerBookings();
            setBookings(response.data.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await bookingAPI.approveBooking(id);
            setBookings(bookings.map(b =>
                b._id === id ? { ...b, status: 'approved' } : b
            ));
        } catch (error) {
            console.error('Error approving booking:', error);
            alert('Failed to approve booking');
        }
    };

    const handleReject = async (id) => {
        try {
            await bookingAPI.rejectBooking(id);
            setBookings(bookings.map(b =>
                b._id === id ? { ...b, status: 'rejected' } : b
            ));
        } catch (error) {
            console.error('Error rejecting booking:', error);
            alert('Failed to reject booking');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'warning';
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
                Booking Requests
            </Typography>

            {bookings.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        No booking requests yet
                    </Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Property</strong></TableCell>
                                <TableCell><strong>Renter</strong></TableCell>
                                <TableCell><strong>Phone</strong></TableCell>
                                <TableCell><strong>Move-in Date</strong></TableCell>
                                <TableCell><strong>Message</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking.propertyId?.title || 'N/A'}</TableCell>
                                    <TableCell>{booking.renterId?.name || 'N/A'}</TableCell>
                                    <TableCell>{booking.phone}</TableCell>
                                    <TableCell>{new Date(booking.moveInDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{booking.message || '-'}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={booking.status.toUpperCase()}
                                            color={getStatusColor(booking.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {booking.status === 'pending' && (
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    startIcon={<CheckIcon />}
                                                    onClick={() => handleApprove(booking._id)}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<CloseIcon />}
                                                    onClick={() => handleReject(booking._id)}
                                                >
                                                    Reject
                                                </Button>
                                            </Box>
                                        )}
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

export default BookingRequests;
