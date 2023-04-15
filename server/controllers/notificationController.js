
// notifications controller
// Author: Jonathan Haddad
// Date created: Mar 22, 2023

/* Description: This file contains the methods for handling various notification-related HTTP requests.
These include creating a new notification, getting all notifications for a user, getting a single notification by ID,
updating a notification (e.g., marking it as read), and deleting a notification. */

const Notification = require("../models/notificationModel");

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get notifications for a user
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId })
      .populate({
        path: "userPosterId",
        select: "name", // Only select the name field of the user
      })
      .sort({ time: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a notification (e.g., mark as read)
const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotification = await Notification.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNotification,
  getUserNotifications,
  updateNotification,
  deleteNotification,
};
