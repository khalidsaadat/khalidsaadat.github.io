const express = require("express");
const companyController = require("../controllers/companyController");

const router = express.Router();

/**
 * @desc Get all companies
 * @route GET /api/companies/getAllCompanies
 * @access Public
 */
router.get("/getAllCompanies", companyController.getAllCompanies);

/**
 * @desc Create a new company
 * @route POST /api/companies/createCompany
 * @access Private
 */
router.post("/createCompany", companyController.createCompany);

/**
 * @desc Get a company by id
 * @route GET /api/companies/getCompanyById
 * @access Private
 */
router.get("/getCompanyById", companyController.getCompanyById);

/**
 * @desc Update a company
 * @route PUT /api/companies/updateCompany
 * @access Private
 */
router.put("/updateCompany", companyController.updateCompany);

/**
 * @desc Delete a company
 * @route DELETE /api/companies/deleteCompany
 * @access Private
 */
router.delete("/deleteCompany", companyController.deleteCompany);

module.exports = router;
