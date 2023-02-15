const express = require("express");
const { addComment, deleteComment, countComments } = require("../controller/comment");
const { UpdatePost } = require("../controller/Post");
const authenticate = require("../middleware/auth");
const router = express.Router();

//Documentation for comments

/**
 * @swagger
 * /posts/{id}/likes:
 *   post:
 *     summary: For creating new likes on a specific post
 *     tags: [likes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the post to add the like to
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The text of the likes
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */


//Add comments

router.post("/:id/likes", authenticate, addComment,UpdatePost);

/**
 * @swagger
 * /posts/{postId}/likes/{commentId}:
 *   delete:
 *     summary: For deleting a specific like on a post
 *     tags: [likes]
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post the comment belongs to
 *         required: true
 *         type: string
 *       - name: likeId
 *         in: path
 *         description: ID of the like to delete
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: like not found
 */


//Delete like
router.delete("/:id/likes/:id", authenticate, deleteComment);

//Documentation counting comments on specific post
/**
 * @swagger
 * /posts/{id}/likes/count:
 *   get:
 *     summary: For retrieving the number of likes for a specific post
 *     tags: [likes]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the post to retrieve like count for
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The number of likes for the post
 *       400:
 *         description: Bad request
 *       404:
 *         description: Post not found
 */


//Count comments
router.get('/:id/likes/count',countComments);


module.exports=router;