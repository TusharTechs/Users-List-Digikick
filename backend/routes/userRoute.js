const express = require('express');
const { getAllUsers, createNewUser, getSingleUserById, updateUserById, deleteUserById } = require('../controllers/userController');
const { authenticateJwt } = require('../middlewares/auth');

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Authenticated
 * Parameters: none
 */

router.get("/", authenticateJwt, getAllUsers);

/**
 * Route: /users
 * Method: POST
 * Description: Create new user
 * Access: Public
 * Parameters: none
 */
router.post("/", createNewUser);

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by id
 * Access: Authenticated
 * Parameters: id
 */
router.get("/:id", authenticateJwt, getSingleUserById);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user data
 * Access: Authenticated
 * Parameters: id
 */
router.put("/:id", authenticateJwt, updateUserById);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by id
 * Access: Authenticated
 * Parameters: id
 */
router.delete("/:id", authenticateJwt, deleteUserById);



module.exports = router;