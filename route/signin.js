const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv/config');
const User = require("../module/user.module");

router.post("/", async (req, res) => {
  try {
    const user =  await User.findOne({ email: req.body.email });
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
      return res.status(400).send("User not Found");
    }
    if (!password) {
      res.status().send("Password is wrong");
    }
    const UserExist = {
      userId: user.id,
      email: user.email,
    };
    const token = jwt.sign(UserExist, process.env.ACCESS_TOKEN_SECRET);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.send({
      status: "success",
      message: `welcome ${user.email}`,
      data: token
    });
  } catch (error) {
    res.status(400).send("Not Authorized");
  }
});



  module.exports = router;