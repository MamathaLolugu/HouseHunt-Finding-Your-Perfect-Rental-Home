const express = require('express');
const router = express.Router();
const {
    registerRenter,
    registerOwner,
    registerAdmin,
    loginUser
} = require('../controllers/authController');

// Register routes
router.post('/register/renter', registerRenter);
router.post('/register/owner', registerOwner);
router.post('/register/admin', registerAdmin);

// Login route
router.post('/login', loginUser);

module.exports = router;
