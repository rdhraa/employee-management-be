const express = require('express');
const { addEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { authenticateJWT, checkAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route for adding a new employee (POST /api/employees)
router.post('/', authenticateJWT, checkAdmin, addEmployee);

// Route for getting all employees (GET /api/employees)
router.get('/', authenticateJWT, checkAdmin, getEmployees);

// Route for updating an employee (PUT /api/employees/:id)
router.put('/:id', authenticateJWT, checkAdmin, updateEmployee);

// Route for deleting an employee (DELETE /api/employees/:id)
router.delete('/:id', authenticateJWT, checkAdmin, deleteEmployee);

module.exports = router;

