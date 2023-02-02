const express = require("express");
const { get } = require("mongoose");
const { createBlog, getAllBlog,
getOneBlog, updateBlog,
deleteBlog, deleteAllBlog } = require('../controllers/blog');
const authenticate = require("../middlewares/auth");
const router = express.Router();
//Create post
router.post("/",createBlog);

/**
 * @swagger
 * /posts: 
 *   get:
 *     summary: For getting all blogs
 *     tags: [blog]
 * 
 *     description: Returns all blogs
 *     responses:
 *       200:
 *         description: All blogs returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
  //View all Post
  router.get("/", getAllBlog);
  //View individual Post
  router.get("/:id", getOneBlog);
  //update post
  router.patch("/:id", updateBlog);
  
  //Delete one Post
  router.delete("/:id", authenticate, deleteBlog);
  //Delete all post
   router.delete("/", deleteAllBlog);
  module.exports = router;