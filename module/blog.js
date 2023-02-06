const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required: 
 *         - title
 *         - description
 *         - imageUrl
 *       properties: 
 *         id: 
 *           type: string
 *           description: The auto-generated id of the user
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 *           format: URL
 *       example:
 *         title: Blog title
 *         description: Blog description
 *         imageUrl: https://images.app.goo.gl/51augVvJcFVxJjV38 
 */

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String, 
    required: true
  },
  comments: [
    {
      email: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  likes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', BlogSchema);
