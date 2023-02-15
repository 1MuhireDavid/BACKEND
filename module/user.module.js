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
 *         role:
 *           type: string
 *       example:
 *         email: user@gmail.com
 *         password: test12 
 *         role: user
 */
const schema= mongoose.Schema({
    email:String,
    password:String,
    role:String,
    token: String
})
module.exports=mongoose.model("User",schema);