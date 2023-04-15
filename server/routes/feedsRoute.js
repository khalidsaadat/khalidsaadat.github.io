const express = require("express");
const router = express.Router();
const feedsController = require("../controllers/feedsController");
const upload = require("../middleware/multerFeeds");

// @desc Create a new feed post
// @route POST /api/user/feed/postFeed
// @access Private
router.post("/postFeed", upload.single("file") ,feedsController.postFeed);

// @desc Get all feed posts
// @route GET /api/user/feed/getFeeds
// @access Public
router.get("/getFeeds", feedsController.getAllPosts);

// @desc Add a like to a feed post
// @route POST /api/user/feed/addLike
// @access Private
router.post("/addLike", feedsController.addLike);

// @desc Add a comment to a feed post
// @route POST /api/user/feed/addComment
// @access Private
router.post("/addComment", feedsController.addComment);

// @desc Update a feed post
// @route POST /api/user/feed/updatePost
// @access Private
router.post("/updatePost", upload.single("file"), feedsController.updateFeed);

// @desc Delete a feed post
// @route DELETE /api/user/feed/deletePost
// @access Private
router.delete("/deletePost", feedsController.deleteFeed);

// @desc Get a feed post by ID
// @route GET /api/user/feed/getFeedById
// @access Public
router.get("/getFeedById", feedsController.getFeedById);

// @desc Get personal feed for a user
// @route GET /api/user/feed/getPersonalFeed
// @access Private
router.get("/getPersonalFeed", feedsController.getPersonalFeed);

// @desc Remove like from feed post
// @route Post /api/user/feed/removeLike
// @access Private
router.post("/removeLike", feedsController.removeLike);

// @desc Remove comment from feed post
// @route Post /api/user/feed/removeComment
// @access Private
router.post("/removeComment", feedsController.removeComment);

module.exports = router;
