const Post = require('../module/blog');
const Joi = require("joi");
//Save post in database

const createBlog = async (req, res) => {
  let responseObject, status;
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
  });
  const { error } = schema.validate(req.body);

  if(error){
   console.log(error);
   status=500;
   responseObject = {error: "Internal error"}
  }
   
    const blog = new Post({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });
    try {

     await blog.save();
     status=201;
   responseObject = {message: "Blog has been successfully created"};
    } catch (error) {
      status=500;
   responseObject = {error: "Internal error"}
    }
    res.status(status).json(responseObject);
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

