const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the education schema
const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});


// Define the Account schema
const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: [true, 'invalid email']
  },
  password: {
    type: String,
    required: [true,'Please enter your password'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isRecruiter: {
    type: Boolean,
    default: false,
  },

  avatar: {
    type: String,
    default: null,
  },

  skills: {
    type: Array,
    required: false,
  },
  languages: {
    type: Array,
    required: false,
  },
  experience: {
    type: Array,
    required: false,
    // default: 0,
  },
  education: [educationSchema],
  projects: {
    type: Array,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  resume: {
    type: Array,
    required: false,
  },
  coverLetter: {
    type: Array,
    required: false,
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: false,
    },
  ],
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  postedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  connectionRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  notifications: {
    type: Array,
    required: false,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to encrypt password before saving
accountSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to decode password before comparing
accountSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const accountM = mongoose.model("Account", accountSchema);

module.exports = accountM;
