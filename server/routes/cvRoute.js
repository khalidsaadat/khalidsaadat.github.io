const express = require("express");
const cvController = require("../controllers/CVcoverLetterController.js");

const router = express.Router();

// @desc Add a new cover letter
// @route POST /user/cv/addCoverLetter
// @access Public
router.post("/addCoverLetter", cvController.addCoverLetter);

// @desc Delete an existing cover letter
// @route DELETE /user/cv/deleteCoverLetter
// @access Public
router.delete("/deleteCoverLetter", cvController.deleteCoverLetter);

// @desc Add a new resume
// @route POST /user/cv/addResume
// @access Public
router.post("/addResume", cvController.addResume);

// @desc Delete an existing resume
// @route DELETE /user/cv/deleteResume
// @access Public
router.delete("/deleteResume", cvController.deleteResume);

module.exports = router;
