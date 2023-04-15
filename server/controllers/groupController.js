// group controller
// Author: Jonathan Haddad
// Date created: Mar 16, 2023

/* Description: This file contains the methods for handling the various group related HTTP requests. 
These include getting all groups, creating a new group, 
getting a specific group by ID, updating a group, and deleting a group.*/

const Group = require('../models/groupModel');
const asyncHandler = require('express-async-handler');

// Get all groups
const getAllGroups = asyncHandler(async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new group
const createGroup = asyncHandler(async (req, res) => {
  try {
    const { name, description, members, status, creator} = req.body;
    const newGroup = await Group.create({ name, description, members, status, creator });
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific group by id
const getGroupById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    const group = await Group.findById(id);
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a group
const updateGroup = asyncHandler(async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a group
const deleteGroup = asyncHandler(async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Group deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add member to group
const joinGroup = asyncHandler(async (req, res) => {
  try {
    const { groupId, memberId } = req.body;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.members.includes(memberId)) {
      return res.status(400).json({ message: 'Member already added to the group' });
    }

    group.members.push(memberId);
    const updatedGroup = await group.save();
    res.status(200).json(updatedGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// remove member from a group
const leaveGroup = asyncHandler(async (req, res) => {
  try {
    const { groupId, memberId } = req.body;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (!group.members.includes(memberId)) {
      return res.status(400).json({ message: 'Member not found in the group' });
    }

    group.members = group.members.filter(member => member.toString() !== memberId);
    const updatedGroup = await group.save();

    res.status(200).json(updatedGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Check if member is already registered 
const checkMember = asyncHandler(async (req, res) => {
  try {
    const { groupId, memberId } = req.query;
    const group = await Group.findById(groupId);

    if (group.members.includes(memberId)) {
      res.status(200).json({ message: 'true' });
    }
    else {
      res.status(200).json({ message: 'false' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// All all groups of a specific user, where they are a member
const getMyJoinedGroups = asyncHandler(async (req, res) => {
  try {
    const { memberId } = req.query;
    // const group = await Group.findById(groupId);  
  
    const group = await Group.find().where('members').in(memberId).exec();
  
    res.status(200).json(group);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// All all groups of a specific user, where they are the creator
const getMyGroups = asyncHandler(async (req, res) => {
  try {
    const { memberId } = req.query;
    // const group = await Group.findById(groupId);  
  
    const group = await Group.find().where('creator').in(memberId).exec();
  
    res.status(200).json(group);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  getAllGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup,
  joinGroup,
  leaveGroup,
  checkMember,
  getMyGroups,
  getMyJoinedGroups,
};
