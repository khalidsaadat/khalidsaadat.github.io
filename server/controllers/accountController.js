// account controller
// Author: Jonathan Haddad - Saad Hanna
// Date created: Feb 20, 2023

/* Description: This file contains the methods for handling the various account related HTTP requests.
 These include user registration, authentication, getting all users, getting user details by id or email,
  updating user details and password, adding a profile image, deleting a user, matching current password, and updating the user profile.*/

const accountM = require("../models/accountModel.js");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await accountM.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isRecruiter} = req.body;

  // Convert the email to lowercase before checking for duplicates
  const existingUser = await accountM.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    // Password validation
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordValidation.test(password)) {
      res.status(400);
      throw new Error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol.");
    }

    // Store the email in lowercase when creating a new user
    const newUser = await accountM.create({
      name,
      email: email.toLowerCase(),
      password,
      isRecruiter,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isRecruiter: newUser.isRecruiter,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});



const getAllUsers = asyncHandler(async (req, res) => {
  const users = await accountM.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(401);
    throw new Error("Users not found");
  }
});



const getUserDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const getUserByMail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await accountM.findOne({ email });
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const updateUser = asyncHandler(async (req, res) => {
  const { id, name, email, password, isAdmin } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    user.name = name;
    user.email = email;
    user.password = password;
    user.isAdmin = isAdmin;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const updatePassword = asyncHandler(async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    if (await user.matchPassword(oldPassword)) {
      user.password = newPassword;
      const updatedUser = await user.save();
      res.json({
        message: "Password updated successfully",
        id: updatedUser._id,
      });
    } else {
      res.status(401);
      throw new Error("Old password is incorrect");
    }
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const addProfileImage = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await accountM.findById(id);
  if (user) {
    user.profilePic = req.body.imageURL;
    const updatedUser = await user.save();
    res.json({
      message: "Profile image updated successfully",
      profilePic: updatedUser.profilePic,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = await accountM.findById(id);
  console.log(user);
  if (user) {
    user.deleteOne();
    res.status(200);
    res.json({ message: "User deleted" });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});



const matchCurrentPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await accountM.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      message: 'true'
    })
  } else {
    res.json({
      message: 'false'
    })
  }
});



const updateProfile = asyncHandler(async (req, res) => {
  const { id, name, email } = req.body;
  const user = await accountM.findById(id);
  if (user) {
    user.name = name;
    user.email = email;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

const searchUsers = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const users = await accountM.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        // { email: { $regex: searchQuery, $options: 'i' } },
      ],
    });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
  login,
  registerUser,
  getAllUsers,
  getUserDetailsById,
  getUserByMail,
  updateUser,
  deleteUser,
  updatePassword,
  addProfileImage,
  updateProfile,
  matchCurrentPassword,
  searchUsers,
};
