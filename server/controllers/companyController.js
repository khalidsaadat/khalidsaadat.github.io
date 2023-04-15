// company controller
// Author: Jonathan Haddad
// Date created: Mar 16, 2023

/* Description: This file contains the methods for handling the various company related HTTP requests.
 These include getting all companies, creating a new company, getting a specific company by ID, updating a company, and deleting a company.*/

const Company = require('../models/companyModel');
const asyncHandler = require('express-async-handler');

// Get all companies
const getAllCompanies = asyncHandler(async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new company
const createCompany = asyncHandler(async (req, res) => {
  try {
    const { name, description, address, employees } = req.body;
    const newCompany = await Company.create({ name, description, address, employees });
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific company by id
const getCompanyById = asyncHandler(async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a company
const updateCompany = asyncHandler(async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a company
const deleteCompany = asyncHandler(async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
