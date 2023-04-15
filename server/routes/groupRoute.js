const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();

// @desc Get all groups
// @route GET /api/groups/getAllGroups
// @access Public
router.get('/getAllGroups', groupController.getAllGroups);

// @desc Add a new group
// @route POST /api/groups/createGroup
// @access Public
router.post('/createGroup', groupController.createGroup);

// @desc Get a specific group by id
// @route GET /api/groups/getGroupById/:id
// @access Public
router.get('/getGroupById', groupController.getGroupById);

// @desc Update a group
// @route PATCH /api/groups/updateGroup/:id
// @access Public
router.patch('/updateGroup', groupController.updateGroup);

// @desc Delete a group
// @route DELETE /api/groups/deleteGroup/:id
// @access Public
router.delete('/deleteGroup', groupController.deleteGroup);

// @desc join a group 
// @route PUT /api/groups/join
// @access Private
router.put('/join', groupController.joinGroup);


// @desc remove a member from an event 
// @route POST /api/groups/leave
// @access Private
router.post('/leave', groupController.leaveGroup);

// @desc checks if a member is registered in the group
// @route GET /api/groups/checkMember
// @access Private
router.get('/checkMember', groupController.checkMember);

// @desc Gets all groups of a member that they are the creator
// @route GET /api/groups/myCreatedGroups
// @access Private
router.get('/myCreatedGroups', groupController.getMyGroups);

// @desc Gets all groups of a member that they are a member
// @route GET /api/groups/checkMember
// @access Private
router.get('/myJoinedGroups', groupController.getMyJoinedGroups);

module.exports = router;
