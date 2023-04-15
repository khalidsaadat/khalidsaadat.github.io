// jobposts controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Mar 1, 2023

/* Description: This file contains the methods for handling the various job post related HTTP requests.
 These include getting all job posts, getting a job post by id, creating a job post, deleting a job post,
 updating a job post, getting all job posts by a user, and applying to a job post. */

const jobPostM = require("../models/jobPostModel.js");
const asyncHandler = require("express-async-handler");

// @desc    Get all job posts
const getJobPosts = asyncHandler(async (req, res) => {
  const jobPosts = await jobPostM.find({});
  res.json(jobPosts);
});

// @desc    Get a job post by id
const getJobPostById = asyncHandler(async (req, res) => {
  const jobPost = await jobPostM.findById(req.params.id);
  if (jobPost) {
    res.json(jobPost);
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});

// @desc    Create a job post
// @body    title, company, location, salary, description, skills, postedBy, postedOn, applicants, isExternal, externalLink ,status
// @return  created job post
const createJobPost = asyncHandler(async (req, res) => {
  const {
    title,
    company,
    location,
    salary,
    description,
    skills,
    postedBy,
    postedOn,
    applicants,
    isExternal,
    externalLink,
    status,
  } = req.body;
  const jobPost = new jobPostM({
    title,
    company,
    location,
    salary,
    description,
    skills,
    postedBy,
    postedOn,
    applicants,
    isExternal,
    externalLink,
    status,
  });
  const createdJobPost = await jobPost.save();
  res.status(201).json(createdJobPost);
});

// @desc    Delete a job post
// @return  deleted job post
const deleteJobPost = asyncHandler(async (req, res) => {
  const jobPost = await jobPostM.findById(req.query.id);
  if (jobPost) {
    await jobPost.remove();
    res.json({ message: "Job post removed" });
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});

// @desc    Update a job post
// @body    title, company, location, salary, description, skills, postedBy, postedOn, applicants, isExternal, externalLink ,status
// @return  updated job post

const updateJobPost = asyncHandler(async (req, res) => {
  const {
    title,
    company,
    location,
    salary,
    description,
    skills,
    postedBy,
    postedOn,
    applicants,
    isExternal,
    externalLink,
    status,
  } = req.body;
  const jobPost = await jobPostM.findById(req.params.id);
  if (jobPost) {
    jobPost.title = title;
    jobPost.company = company;
    jobPost.location = location;
    jobPost.salary = salary;
    jobPost.description = description;
    jobPost.skills = skills;
    jobPost.postedBy = postedBy;
    jobPost.postedOn = postedOn;
    jobPost.applicants = applicants;
    jobPost.isExternal = isExternal;
    jobPost.externalLink = externalLink;
    jobPost.status = status;
    const updatedJobPost = await jobPost.save();
    res.json(updatedJobPost);
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});

// @desc   Get all job posts by a user
// @param  id: user id
// @return  job posts
const getJobPostsByUser = asyncHandler(async (req, res) => {
  const jobPosts = await jobPostM.find({ postedBy: req.params.id });
  if (jobPosts) {
    res.json(jobPosts);
  } else {
    res.status(404);
    throw new Error("Job posts not found");
  }
});


// @desc apply to a job post
// @param id: job post id
// @body applicant: user id of the applicant and link to the resume
// @return updated job post
const applyToJobPost = asyncHandler(async (req, res) => {
  const { userId, jobId, resume, coverLetter } = req.body;
  const jobPost = await jobPostM.findById(jobId);

  if (jobPost) {
    jobPost.applicants.push({ userId, resume, coverLetter });
    const updatedJobPost = await jobPost.save();
    res.json(updatedJobPost);
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});

// @desc Get all applicants for a job post
// @param jobId: Job post id
// @return Applicants array
const getApplicantsByJob = asyncHandler(async (req, res) => {
  const jobPost = await jobPostM.findById(req.params.jobId);
  if (jobPost) {
    res.json(jobPost.applicants);
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});


// @desc Update an applicant's resume and cover letter
// @route PUT /api/user/jobPosts/updateApplication/:jobId
// @access Private
const updateApplicantInfo = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const { userId, resume, coverLetter } = req.body;

  const jobPost = await jobPostM.findById(jobId);

  if (!jobPost) {
    res.status(404);
    throw new Error("Job post not found");
  }

  console.log("Job post applicants: ", jobPost.applicants);
  console.log("Request userId:", userId);

  // Find the specific user's application
  const applicantIndex = jobPost.applicants.findIndex(
      (applicant) => applicant.userId.toHexString() === userId.toString()
  );

  if (applicantIndex === -1) {
    res.status(404);
    throw new Error("User's application not found");
  }

  // Update the specific user's application
  jobPost.applicants[applicantIndex].resume = resume;
  jobPost.applicants[applicantIndex].coverLetter = coverLetter;

  const updatedJobPost = await jobPost.save();

  res.status(200).json(updatedJobPost);
});


// @desc    Reject an applicant
// @return  updated applicant data
const rejectApplicant = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const {applicantUserId } = req.body;

  const jobPost = await jobPostM.findById(jobId);


  if (jobPost) {

    const updatedApplicants = jobPost.applicants.filter(
        (applicant) => applicant._id.toString() === applicantUserId.toString()
    );

    if (updatedApplicants.length !== jobPost.applicants.length) {
      jobPost.applicants = updatedApplicants;
      await jobPost.save();
      res.json({ message: "Applicant rejected", applicants: jobPost.applicants });
    } else {
      res.status(404);
      throw new Error("Applicant not found");
    }
  } else {
    res.status(404);
    throw new Error("Job post not found");
  }
});

module.exports = {
  rejectApplicant,
  getApplicantsByJob,
  getJobPosts,
  getJobPostById,
  createJobPost,
  deleteJobPost,
  updateJobPost,
  getJobPostsByUser,
  applyToJobPost,
  updateApplicantInfo,
};