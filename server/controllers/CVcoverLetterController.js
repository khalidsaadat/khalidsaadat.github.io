// CV cover letter controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Feb 22, 2023

/* Description: This file contains the methods for handling the various HTTP requests
 related to CV cover letters. These include adding and deleting cover letters and resumes.*/


const accountM = require("../models/accountModel.js");
const asyncHandler = require("express-async-handler");

// add cover letter
const addCoverLetter = asyncHandler(async (req, res) => {
  const { id, coverLetter } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.coverLetter.push(coverLetter);
    await user.save();
    res.json({
      message: "Cover letter added successfully",
      userCoverLetterList: user.coverLetter,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete cover letter
const deleteCoverLetter = asyncHandler(async (req, res) => {
  const { id, coverLetter } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.coverLetter = user.coverLetter.filter((item) => item !== coverLetter);
    await user.save();
    res.json({
      message: "Cover letter deleted successfully",
      userCoverLetterList: user.coverLetter,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// add resume
const addResume = asyncHandler(async (req, res) => {
  const { id, resume } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.resume.push(resume);
    await user.save();
    res.json({
      message: "Resume added successfully",
      userResunmeList: user.resume,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// delete resume
const deleteResume = asyncHandler(async (req, res) => {
  const { id, resume } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.resume = user.resume.filter((item) => item !== resume);
    await user.save();
    res.json({
      message: "Resume deleted successfully",
      userResunmeList: user.resume,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

module.exports = {
  addCoverLetter,
  deleteCoverLetter,
  addResume,
  deleteResume,
};