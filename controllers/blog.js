const express = require('express');

const Post = require('../module/blog');



//Save post in database

createBlog = async (req, res) => {
    const blog = new Post({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });
     await blog.save();
    res.send(blog);
  };
  //View all Post
  const getAllBlog = async(req,res)=>{ 
      try {
          const posts= await Post.find({});
          res.send(posts);
      } catch{
          res.status(404);
          res.send({error:"Failed to retreive all post!"});
      }
  };
 
  //View individual Post
  const getOneBlog = async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  };
  //update post
  const updateBlog = async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (req.body.title) {
        post.title = req.body.title;
      }
      if (req.body.description) {
        post.description = req.body.description;
      }
      await post.save();
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  };
  //Delete one Post
  const deleteBlog = async (req, res) => {
    try {
      await Post.deleteOne({_id:req.params.id})
      res.status(202).send();
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  };
 
  //Delete all post
  const deleteAllBlog = async(req,res)=>{
      try {
          await Post.deleteMany({})
          res.status(202).send();    
      } catch {
          res.status(404);
          res.send({error:"Failed to delete all Post!"});
      }  
  };

module.exports = {
  createBlog: createBlog,
  getAllBlog: getAllBlog,
  getOneBlog: getOneBlog,
  updateBlog: updateBlog,
  deleteBlog: deleteBlog,
  deleteAllBlog:deleteAllBlog
};

