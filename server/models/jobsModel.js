const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the job schema
const jobSchema = new Schema({
  // Title field, required and of type String
  title: {
    type: String,
    required: true,
  },
  // Company field, required and of type String
  company: {
    type: String,
    required: true,
  },
  // Location field, required and of type String
  location: {
    type: String,
    required: true,
  },
  // Salary field, required and of type String
  salary: {
    type: String,
    required: true,
  },
  // Description field, required and of type String
  description: {
    type: String,
    required: true,
  },
  // User field, refers to the Account model and is of type ObjectId
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },
});

// Create the Job model using the job schema
const Job = mongoose.model("Job", jobSchema);

// Export the Job model
module.exports = Job;
