const Employee = require('../models/employee');
const mongoose = require('mongoose');

const addEmployee = async (req, res) => {
  const { name, email, phone, department } = req.body;

  try {
    const existingEmployeeByEmail = await Employee.findOne({ email });
    const existingEmployeeByPhone = await Employee.findOne({ phone });

    if (existingEmployeeByEmail) {
      return res.status(400).json({ error: 'Employee with this email already exists' });
    }

    if (existingEmployeeByPhone) {
      return res.status(400).json({ error: 'Employee with this phone number already exists' });
    }

    const newEmployee = new Employee({
      name,
      email,
      phone,
      department,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

const getEmployees = async (req, res) => {
  const { search, department, page = 1, limit = 10 } = req.query;
  const query = {};

  if (search) {
    query.name = { $regex: search, $options: 'i' }; 
  }
  if (department) {
    query.department = department; 
  }

  try {
    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalEmployees = await Employee.countDocuments(query);

    res.status(200).json({
      employees,
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch employees', details: err.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, department } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid employee ID format' });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, email, phone, department },
      { new: true } 
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update employee', details: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid employee ID format' });
  }

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete employee', details: err.message });
  }
};
module.exports = {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
