const express = require('express');
const router = express.Router();
const {
    addProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    getSinglePropertyById,
    getOwnerProperties
} = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const { isOwner } = require('../middleware/roleMiddleware');

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getSinglePropertyById);

// Owner routes (protected)
router.post('/add', authMiddleware, isOwner, addProperty);
router.put('/update/:id', authMiddleware, isOwner, updateProperty);
router.delete('/delete/:id', authMiddleware, isOwner, deleteProperty);
router.get('/owner/myproperties', authMiddleware, isOwner, getOwnerProperties);

module.exports = router;
