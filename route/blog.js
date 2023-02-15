const express = require("express");
const { get } = require("mongoose");
const { createBlog, getAllBlog,
getOneBlog, updateBlog,
deleteBlog, deleteAllBlog } = require('../controllers/blog');
const authenticate = require("../middlewares/auth");
const upload = require("../middlewares/multer");
const router = express.Router();
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Creates a new blog.
 *     tags: [blog]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog has been created successfully
 *       403:
 *         description: Blog already exists
 *       424:
 *         description: Blog has not been created successfully
 * 
 */
//Create post
router.post("/", upload.single('image'),createBlog);

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
/**
 * @swagger
 * /posts/{id}: 
 *   get: 
 *     summary: For getting one blog
 *     tags: [blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: The blog id
 *     description: Returns a blog
 *     responses:
 *       200:
 *         description: blog successfully found
 *         content:
 *           application/json:
 *             schema:
 *               type: '#/components/schemas/Blog'
 *       404:
 *         description: blog not found
 */
  router.get("/:id", getOneBlog);

  //update post
/**
 * @swagger
 * /posts/{id}: 
 *   put:
 *     description: For updating a blog
 *     tags: [blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the blog 
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: blog has been successfully updated
 *       400:
 *         decription: Invalid blog information
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message returned from Joi
 *       404:
 *         decription: blog has not been found
 */
  router.put("/:id", updateBlog);
  
  //Delete one Post
/**
 * @swagger
 * /posts/{id}: 
 *   delete: 
 *     summary: For deleting a blog
 *     tags: [blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: The user id
 *     security:
 *      - bearerAuth: []
 *     description: Returns deleted blog
 *     responses:
 *       200:
 *         description: user successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: '#/components/schemas/Blog'
 *       404:
 *         description: blog not found
 */
  router.delete("/:id", authenticate, deleteBlog);
  module.exports = router;