const express = require("express");
const accountController = require("../controllers/accountController.js");

const router = express.Router();

/**
 * @desc Register a new user
 * @route POST /api/account/register
 * @access Public
 */
router.post("/register", accountController.registerUser);

/**
 * @desc Authenticate user
 * @route POST /api/account/login
 * @access Public
 */
router.post("/login", accountController.login);

/**
 * @desc Get all users
 * @route GET /api/account/users
 * @access Public
 */
router.get("/users", accountController.getAllUsers);

/**
 * @desc Get user details by ID
 * @route GET /api/account/getUser
 * @access Public
 */
router.get("/getUser", accountController.getUserDetailsById);

/**
 * @desc Get user details by email
 * @route GET /api/account/userByMail
 * @access Public
 */
router.get("/userByMail", accountController.getUserByMail);

/**
 * @desc Update user details by ID
 * @route PUT /api/account/updateUser
 * @access Public
 */
router.put("/updateUser", accountController.updateUser);

/**
 * @desc Update user password by ID
 * @route PUT /api/account/updatePassword
 * @access Public
 */
router.put("/updatePassword", accountController.updatePassword);

/**
 * @desc Add profile image for user
 * @route POST /api/account/addProfileImage
 * @access Public
 */
router.post("/addProfileImage", accountController.addProfileImage);

/**
 * @desc Delete user by ID
 * @route DELETE /api/account/deleteUser
 * @access Public
 */
router.delete("/deleteUser", accountController.deleteUser);

/**
@desc Update user profile information
@route PUT /api/account/updateProfile
@access Public
*/
router.put("/updateProfile", accountController.updateProfile);

/**
@desc Match the entered password with the current user's password
@route POST /api/account/matchPassword
@access Public
*/
router.post("/matchPassword", accountController.matchCurrentPassword);

/**
 * @desc Search users by name or email
 * @route GET /api/account/search
 * @access Public
 */
router.get("/search", accountController.searchUsers);




module.exports = router;
