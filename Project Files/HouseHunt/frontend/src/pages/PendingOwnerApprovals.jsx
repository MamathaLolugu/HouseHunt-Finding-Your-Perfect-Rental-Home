import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { adminAPI } from '../services/api';

const PendingOwnerApprovals = () => {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingOwners();
    }, []);

    const fetchPendingOwners = async () => {
        try {
            const response = await adminAPI.getPendingOwners();
            setOwners(response.data.data);
        } catch (error) {
            console.error('Error fetching pending owners:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await adminAPI.approveOwner(id);
            setOwners(owners.filter(o => o._id !== id));
            alert('Owner approved successfully!');
        } catch (error) {
            console.error('Error approving owner:', error);
            alert('Failed to approve owner');
        }
    };

    const handleReject = async (id) => {
        if (window.confirm('Are you sure you want to reject this owner? This will delete their account.')) {
            try {
                await adminAPI.rejectOwner(id);
                setOwners(owners.filter(o => o._id !== id));
                alert('Owner rejected and removed');
            } catch (error) {
                console.error('Error rejecting owner:', error);
                alert('Failed to reject owner');
            }
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
                Pending Owner Approvals
            </Typography>

            {owners.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        No pending owner approvals
                    </Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Registration Date</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {owners.map((owner) => (
                                <TableRow key={owner._id}>
                                    <TableCell>{owner.name}</TableCell>
                                    <TableCell>{owner.email}</TableCell>
                                    <TableCell>{new Date(owner.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                startIcon={<CheckIcon />}
                                                onClick={() => handleApprove(owner._id)}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                startIcon={<CloseIcon />}
                                                onClick={() => handleReject(owner._id)}
                                            >
                                                Reject
                                            </Button>
                                        </Box>
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

export default PendingOwnerApprovals;
