const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the message schema
const messageSchema = new Schema({
  // Sender field, required and of type String
  sender: {
    type: String,
    required: true,
  },
  // Receiver field, required and of type String
  receiver: {
    type: String,
    required: true,
  },
  // Message field, required and of type String
  message: {
    type: String,
    required: true,
  },
  
  // Attachment field
  attachments: [
    {
      fileName: String,
      filePath: String,
    },
  ],

  // Report type field, required and of type String
  reportType: {
    type: String,
    default: null,
  },

  // Time field, required and of type Date
  time: {
    type: Date,
    required: true,
  },
  
});

// Create the Message model using the message schema
const Message = mongoose.model("Message", messageSchema);

// Export the Message model
module.exports = Message;
