const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Notification schema
const notificationSchema = new Schema({
  time: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  userPosterId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

// Create the Notification model using the notification schema
const Notification = mongoose.model("Notification", notificationSchema);

// Export the Notification model
module.exports = Notification;
