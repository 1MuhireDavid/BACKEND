const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const User = require("../module/user.module");
/**
 * @swagger
 * /signin:
 *   post:
 *     summary: login for user
 *     tags: [users]
 *     description: Log in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email for the user
 *               password:
 *                 type: string
 *                 description: The password for the user
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the operation
 *                 message:
 *                   type: string
 *                   description: The message to the user
 *                 data:
 *                   type: string
 *                   description: The JWT assigned to the user
 *       400:
 *         description: Bad request
 */
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
      return res.status(400).send("User not Found");
    }
    if (!password) {
      res.status(400).send("Password is wrong");
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
      data: token,
      role: user.role,
    });
  } catch (error) {
    res.status(400).send("Not Authorized");
  }
});
module.exports = router;