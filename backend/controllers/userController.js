const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middlewares/auth');

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
    
        if (users.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No users found",
          });
        }
    
        res.status(200).json({
          success: true,
          data: users,
        });
      } 
      catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }};

// CREATE A NEW USER
exports.createNewUser = async (req, res) => {
    try {
      const { data } = req.body;
      const user = await userModel.findOne({ username: data.username });
      if (user) {
        return res.status(403).json({ message: 'User already exists' });
      }

      const newUser = new userModel(data);
      await newUser.save();

      // Generate a token for the newly created user
      const token = jwt.sign({ username: data.username }, SECRET, { expiresIn: '1h' });
  
      return res.status(201).json({
        success: true,
        data: newUser,
        token,
      });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: 'Failed to create a new user or sign the token.',
        });
    }
};

// GET A SINGLE USER BY ID
exports.getSingleUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user.",
    });
  }
};

// UPDATE A USER BY ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    console.log(req.body);

    const updatedUserData = await userModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          ...data,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedUserData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    return res.status(200).json({
      success: true,
      data: updatedUserData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user.",
    });
  }
};

// DELETE A USER BY ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.deleteOne({
      _id: id,
    });

    if (user.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User to be deleted was not found",
      });
    }

    return res.status(202).json({ success: true, message: "Deleted the user successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user.",
    });
  }
};