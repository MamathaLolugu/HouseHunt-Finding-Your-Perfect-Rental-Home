const express = require('express');
const router = express.Router();
const {
    createBookingRequest,
    getRenterBookings,
    getOwnerBookingRequests,
    approveBookingRequest,
    rejectBookingRequest
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const { isRenter, isOwner } = require('../middleware/roleMiddleware');

// Renter routes
router.post('/request', authMiddleware, isRenter, createBookingRequest);
router.get('/renter', authMiddleware, isRenter, getRenterBookings);

// Owner routes
router.get('/owner', authMiddleware, isOwner, getOwnerBookingRequests);
router.put('/approve/:id', authMiddleware, isOwner, approveBookingRequest);
router.put('/reject/:id', authMiddleware, isOwner, rejectBookingRequest);

module.exports = router;
