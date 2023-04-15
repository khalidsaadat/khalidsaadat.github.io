// notificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController")

/**
 * @desc Create a new notification
 * @route POST /api/notifications
 * @access Public
 */
router.post("/createNotification", notificationController.createNotification);

/**
 * @desc Get notifications for a user
 * @route GET /api/notifications/user/:userId
 * @access Public
 */
router.get("/user/:userId", notificationController.getUserNotifications);

/**
  * @desc Update a notification (e.g., mark as read)
 * @route PUT /api/notifications/updateNotification
 * @access Public
 */
router.put("/updateNotification", notificationController.updateNotification);

/**
 * @desc Delete a notification
 * @route DELETE /api/notifications/deleteNotification/:id
 * @access Public
 */
router.delete("/deleteNotification/:id", notificationController.deleteNotification);

module.exports = router;
