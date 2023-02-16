const Post = require('../module/blog');
const Joi = require("joi");
const cloudinary = require('../utils/cloudinary')
//Save post in database

const createBlog = async (req, res) => {
  let responseObject, status;
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if(error){
   console.log(error);
   status=500;
   responseObject = {error: error}
   return res.status(status).json({responseObject})
  }
   
    
    try {
      const result = await cloudinary.uploader.upload(req.body.imageUrl, {
        folder: "blogs",
        //width: 300,
        // crop: scale
        
      })
      const blog = new Post({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
      });
      console.log(blog)


     await blog.save();
     status=201;
   responseObject = {message: "Blog has been successfully created"};
    } catch (error) {
      status=500;
   responseObject = {error: "Internal error"}
    }
    res.status(status).json({responseObject});
  };
  const createComment = (req, res) => {
    const { postId } = req.params;
  const { author, content } = req.body;
  Post.findById(postId, (err, post) => {
    if (err) {
      res.status(500).send(err);
    } else {
      post.comments.push({ author, content });
      post.save(err => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send('Comment added successfully');
        }
      });
    }
  });
    

  }
  const likes = (req, res) => {
    const { postId } = req.params;
  const { token } = req.body;
  User.findOne({ token }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(401).send('Unauthorized');
    } else {
      Post.findById(postId, (err, post) => {
        if (err) {
          res.status(500).send(err);
        } else {
          post.likes.push(user._id);
          post.save(err => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send('Post liked successfully');
            }
          });
        }
      });
    }
  });
    

  }
  
  //View all Post
  const getAllBlog = async(req,res)=>{ 

      try {
          const posts= await Post.find({});
          res.status(200).json({data: posts});
      } catch{
          res.status(404).json({error:"Failed to retreive all post!"});
      }
  };
 
  //View individual Post
  const getOneBlog = async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.status(200).json({data: post });
    } catch {
      res.status(404).json({ error: "Post doesn't exist!" });
    }
  };
  //update post
  const updateBlog = async (req, res) => {
    
      const post = await Post.findOne({ _id: req.params.id });
      if (req.body.title) {
        post.title = req.body.title;
      }
      if (req.body.description) {
        post.description = req.body.description;
      }
      try {
      await post.save();
      res.send(post);
    } catch (error) {
      res.status(404).json({ message: "Post doesn't exist!" });
    }
  };
  //Delete one Post
  const deleteBlog = async (req, res) => {
    
    try {
     const post = await Post.findByIdAndRemove(req.params.id);
      console.log(post)
      res.status(202).json({message: "Blog has been successfully deleted"});
    } catch {
      res.status(404).json({ error: "Post doesn't exist!" });
    }
  };
 

module.exports = {
  createBlog: createBlog,
  getAllBlog: getAllBlog,
  getOneBlog: getOneBlog,
  updateBlog: updateBlog,
  deleteBlog: deleteBlog
};

