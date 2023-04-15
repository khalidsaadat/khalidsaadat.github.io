const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: false, // must be set to true after testing 
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const eventM = mongoose.model('Event', eventSchema);

module.exports = eventM;
