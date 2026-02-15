import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#2c3e50', color: 'white', py: 3, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Typography variant="body1" align="center">
                    © 2024 HouseHunt - Finding Your Perfect Rental Home
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Made with ❤️ using MERN Stack
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
