const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define jobPost schema
const jobPostSchema = new Schema({
  title: {
    type: String, // Title of the job post
    required: true,
  },
  company: {
    type: String, // Company that posted the job
    required: true,
  },
  location: {
    type: String, // Location of the job
    required: true,
  },
  salary: {
    type: String, // Salary offered for the job
    required: true,
  },
  description: {
    type: String, // Description of the job
    required: true,
  },
  skills: {
    type: Array, // Required skills for the job
    required: true,
  },
  postedBy: {
    type: String, // User who posted the job
    required: true,
  },
  postedOn: {
    type: Date, // Date when the job was posted
    required: true,
    default: Date.now,

  },
  applicants: [
    {
      userId: {
        type: mongoose.Types.ObjectId, // User who applied for the job
        ref: "Account",
        required: true,
      },
      resume: {
        type: String, // Resume of the user who applied for the job
        required: true,
      },
      coverLetter: {
        type: String, // Cover letter of the user who applied for the job
        required: true,
      },
    },
  ],
  status: {
    type: String, // Status of the job post (open, closed, etc.)
    required: true,
  },
  isExternal: {
    type: Boolean, // Is the job post external or internal
    required: true,
  },
  externalLink: {
    type: String, // Link to the external job post
    required: false,
  },
});

// Create a Mongoose model for the job post
const JobPost = mongoose.model("JobPost", jobPostSchema);

// Export the JobPost model
module.exports = JobPost;
