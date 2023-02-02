const mongoose= require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: 
 *         - email
 *         - password
 *       properties: 
 *         id: 
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         email: user@gmail.com
 *         password: test12 
 */
const schema= mongoose.Schema({
    email:String,
    password:String
})
module.exports=mongoose.model("User",schema);