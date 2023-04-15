// feed controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Mar 2, 2023

/*Description: This file contains the methods for handling the various feed related HTTP requests.
 These include posting a new feed, getting all feeds based on filters and pagination, getting a single feed by id, 
 deleting a feed, updating a feed, adding a like to a feed, adding a comment to a feed, and getting a personal feed for a user.
 The controller uses the feedsModel and accountM models to interact with the database.
 The getAllPosts method performs advanced filtering using the $gte, $gt, $lte, and $lt
 operators to match posts that meet the specific criteria. It then adds sorting based on the sort query parameter,
 and pagination based on the page and limit query parameters. Overall, this controller allows users to perform various actions on feeds,
 including creating, updating, and deleting feeds, and interacting with feeds through likes and comments.*/

const feedsM = require("../models/feedsModel.js");
const asyncHandler = require("express-async-handler");
const accountM = require("../models/accountModel.js");

const postFeed = asyncHandler(async (req, res) => {
  const { description, tags, userId } = req.body;
  // Get the user's information
  const user = await accountM.findById(userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const poster = user._id;
  const name = user.name;
  const postedOn = new Date();
  const image = req.file ? req.file.path : "";

  const feed = new feedsM({
    poster,
    name,
    description,
    image,
    tags,
    postedOn,
    likes: [],
    comments: [],
    status: "public",
  });

  const createdFeed = await feed.save();
  res.status(201).json(createdFeed);
});


const getAllPosts = asyncHandler(async (req, res, next) => {
  try {
    // Build query object
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = feedsM.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-postedOn");
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute query
    const posts = await query;

    // Send response
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// pass the id of the post you want to get in the url

const getFeedById = asyncHandler(async (req, res) => {
  const feed = await feedsM.findById(req.query.id);
  if (feed) {
    res.json(feed);
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});

const deleteFeed = asyncHandler(async (req, res) => {
  const feed = await feedsM.findById(req.params.id);
  if (feed) {
    await feed.remove();
    res.json({ message: "Feed removed" });
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});


const updateFeed = asyncHandler(async (req, res) => {
  const {
    title,
    poster,
    postedOn,
    description,
    likes,
    comments,
    status,
    tags,
  } = req.body;
  const feed = await feedsM.findById(req.params.id);
  const image = req.file ? req.file.path : feed.image;

  if (feed) {
    feed.title = title;
    feed.poster = poster;
    feed.postedOn = postedOn;
    feed.description = description;
    feed.image = image;
    feed.likes = likes;
    feed.comments = comments;
    feed.status = status;
    feed.tags = tags;
    const updatedFeed = await feed.save();
    res.json(updatedFeed);
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});


const addLike = asyncHandler(async (req, res) => {
  const postId = req.body.id;
  const like = req.body.like;

  const feed = await feedsM.findById(postId);

  if (feed) {
    if (!feed.likes.includes(like)) {
      feed.likes.push(like);
      const updatedFeed = await feed.save();
      res.json(updatedFeed);
    } else {
      res.status(400);
      throw new Error("User has already liked this post");
    }
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});


const removeLike = asyncHandler(async (req, res) => {
  const postId = req.body.id;
  const like = req.body.like;

  const feed = await feedsM.findById(postId);

  if (feed) {
    if (feed.likes.includes(like)) {
      feed.likes = feed.likes.filter((l) => l !== like);
      const updatedFeed = await feed.save();
      res.json(updatedFeed);
    } else {
      res.status(400);
      throw new Error("User has not liked this post");
    }
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});


const addComment = asyncHandler(async (req, res) => {
  const postId = req.body.id;
  const commentData = req.body.comment;

  const user = await accountM.findById(commentData.userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const commenterName = user.name;
  const timestamp = new Date();
  const comment = { ...commentData, commenterName, timestamp };
  const feed = await feedsM.findById(postId);
  if (feed) {
    feed.comments.push(comment);
    const updatedFeed = await feed.save();
    res.json(updatedFeed);
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});


const removeComment = asyncHandler(async (req, res) => {
  const postId = req.body.postId;
  const commentId = req.body.commentId;

  const feed = await feedsM.findById(postId);

  if (feed) {
    const commentIndex = feed.comments.findIndex((comment) => comment._id.toString() === commentId);

    if (commentIndex >= 0) {
      feed.comments.splice(commentIndex, 1);
      const updatedFeed = await feed.save();
      res.json(updatedFeed);
    } else {
      res.status(400);
      throw new Error("Comment not found");
    }
  } else {
    res.status(404);
    throw new Error("Feed not found");
  }
});


const getPersonalFeed = asyncHandler(async (req, res) => {
  const id = req.query.id; // user id
  const feed = [];
  try {
    const user = await accountM.findById(id);

    // Fetch user's own posts
    const userPosts = await feedsM.find({ poster: id });

    for (let i = 0; i < user.connections.length; i++) {
      const posts = await feedsM.find({ poster: user.connections[i] });
      feed.push(...posts);
    }

    // Add user's own posts to the feed
    feed.push(...userPosts);

    // Sort feed by postedOn in descending order (newest first)
    feed.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));

    res.status(200).json(feed);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  postFeed,
  getAllPosts,
  getFeedById,
  deleteFeed,
  updateFeed,
  addLike,
  removeLike,
  addComment,
  getPersonalFeed,
  removeComment,
};
