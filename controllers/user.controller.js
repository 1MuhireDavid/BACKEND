const User = require("../module/user.module");
const { validateUser, hashPassword } = require("../middlewares/signupvalidator");
const { default: mongoose } = require("mongoose");
const jwt=require("jsonwebtoken");
require('dotenv/config');
//Create New User
const createUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");
  req.body.password = await hashPassword(req.body.password);
  let userRole = "user"
  user = new User({
    email: req.body.email,
    password: req.body.password,
    role: userRole
  });
  console.log(user)
  try {
    await user.save();
    res.status(201).json({message: "User successfully created", data: user})
  } catch (error) {
    res.status(500).json({error: "failed to create a user"})
  }

}
//Retrieve All User
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({data: users});
   // res.status(200).send(users);
  } catch (error) {
    res.status(404).json({error:"Failed to retreive all post!"});
  }

};
//Retreive only one user
const getOneUser = async (req, res) => {
  

  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    res.status(200).json({data: user});
  } catch (error) {
    
    return res.status(404).json({error: "No user with such ID was found"});
  }
  
};
const updateUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Check if user exists
  let user = await User.findById(req.params.id);
  if (!user) return res.status(400).send("User Not Found");
  //Hash password if it updated
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }
  //Update User
  user = await User.findByIdAndUpdate(req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ user });
};
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.status(200).json({ message: `user with id ${req.params.id} deleted Successfully` });
};
module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};