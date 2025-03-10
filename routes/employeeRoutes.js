const express = require('express');
const { addEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { authenticateJWT, checkAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticateJWT, checkAdmin, addEmployee);
router.get('/', authenticateJWT, checkAdmin, getEmployees);
router.put('/:id', authenticateJWT, checkAdmin, updateEmployee);
router.delete('/:id', authenticateJWT, checkAdmin, deleteEmployee);

module.exports = router;

