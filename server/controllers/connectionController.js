// connection controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Feb 20, 2023

/* Description: This file contains the methods for handling the various connection related HTTP requests.
 These include sending connection requests, accepting connection requests, rejecting connection requests, and removing connections.*/

const asyncHandler = require("express-async-handler");
const accountM = require("../models/accountModel.js");

const getAllConnections = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const user = await accountM.findById(userId).populate("connections");
  if (user) {
    res.json(user.connections);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const getConnectionRequests = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const user = await accountM.findById(userId).populate("connectionRequests");
  if (user) {
    res.json(user.connectionRequests);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const sendConnectionRequest = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const user = await accountM.findById(receiverId);
  if (user) {
    if (
      user.connectionRequests.includes(senderId) ||
      user.connections.includes(senderId)
    ) {
      res.json("Request already sent, can't send again");
    } else {
      user.connectionRequests.push(senderId);
      await user.save();
      res.json("Connection request sent successfully");
    }
  } else {
    res.status(401);
    throw new Error("Recepient not found");
  }
});

const acceptConnectionRequest = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const user = await accountM.findById(receiverId);
  const sender = await accountM.findById(senderId);
  if (user) {
    user.connectionRequests = user.connectionRequests.filter(
      (item) => item.toString() !== senderId
    );
    user.connections.push(senderId);
    sender.connections.push(receiverId);
    await user.save();
    await sender.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("Recepient not found");
  }
});

const rejectConnectionRequest = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.body;
  const user = await accountM.findById(receiverId);
  if (user) {
    user.connectionRequests = user.connectionRequests.filter(
      (item) => item.toString() !== senderId
    );
    await user.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("Recepient not found");
  }
});

const removeConnection = asyncHandler(async (req, res) => {
  const { userId, connectionId } = req.body;
  const user = await accountM.findById(userId);
  const connection = await accountM.findById(connectionId);
  if (user) {
    user.connections = user.connections.filter(
      (item) => item.toString() !== connectionId
    );
    connection.connections = connection.connections.filter(
      (item) => item.toString() !== userId
    );
    await user.save();
    await connection.save();
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

module.exports = {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  removeConnection,
  getConnectionRequests,
  getAllConnections,
};
