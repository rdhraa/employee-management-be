const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid phone number'],
    trim: true, 
  },
  department: {
    type: String,
    required: true,
    enum: ['HR', 'Engineering', 'Marketing', 'Sales', 'Designer'],
    set: val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(), 
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;