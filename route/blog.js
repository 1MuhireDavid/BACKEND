const express = require("express");
const { get } = require("mongoose");
const { createBlog, getAllBlog,
getOneBlog, updateBlog,
deleteBlog, deleteAllBlog } = require('../controllers/blog');
const router = express.Router();
//Create post
router.post("/",createBlog);
  //View all Post
  router.get("/", getAllBlog);
  //View individual Post
  router.get("/:id", getOneBlog);
  //update post
  router.patch("/:id", updateBlog);
  //Delete one Post
  router.delete("/:id", deleteBlog);
  //Delete all post
   router.delete("/", deleteAllBlog);
  module.exports = router;