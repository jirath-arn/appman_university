const universitiesController = require('../controllers/universitiesController');

const express = require('express');
const router = express.Router();

// Get all.
router.get('/', universitiesController.getAll);

// Get specific.
router.get('/:id', universitiesController.getUniversity);

// Create.
router.post('/', universitiesController.createUniversity);

// Update.
router.put('/:id', universitiesController.updateUniversity);

// Delete.
router.delete('/:id', universitiesController.deleteUniversity);

module.exports = router;
