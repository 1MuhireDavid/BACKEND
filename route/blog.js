const express = require("express");
const blogController=require('../controllers/blog');
const router = express.Router();

//Create post
router.post("/", blogController.createBlog,(req,res)=>{
    res.send(req.post);
  });
  //View all Post
  router.get('/',blogController.getAllBlog,(req,res)=>{
    res.send(req.posts);
  });
  
  //View individual Post
  router.get("/:id", blogController.getOneBlog,(req,res)=>{
    res.send(req.post);
  });
  //update post
  router.patch("/:id",blogController.updateBlog,(req,res)=>{
    res.send(req.post);
  } );
  //Delete one Post
  router.delete("/:id", blogController.deleteBlog,(req,res)=>{
    res.send("Post deleted Successfully");
  });
  
  //Delete all post
   router.delete('/',blogController.deleteAllBlog,(req,res)=>{
     res.send("All Post deleted Successfully");
   })
  module.exports = router;