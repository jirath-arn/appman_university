const studentsController = require('../controllers/studentsController');

const express = require('express');
const router = express.Router();

// Get all.
router.get('/', studentsController.getAll);

// Get specific.
router.get('/:id', studentsController.getStudent);

// Create.
router.post('/', studentsController.createStudent);

// Update.
router.put('/:id', studentsController.updateStudent);

// Delete.
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;
