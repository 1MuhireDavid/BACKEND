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
  //   public_id: {type: String, 
  //     required: true},
   type: String, 
      required: true
  },
  comments: [
    {
      title: String,
      comment: String,
      date: { type: Date, default: Date.now }
    }
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', BlogSchema);
