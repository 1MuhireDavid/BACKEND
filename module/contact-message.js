const mongoose= require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required: 
 *         - name
 *         - email
 *         - description
 *       properties: 
 *         id: 
 *           type: string
 *           description: The auto-generated id of the message
 *         name: 
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         description:
 *           type: string
 *       example:
 *         name: MUGISHA INNOCENT
 *         email: user@gmail.com
 *         description: I liked your work
 */
const schema= mongoose.Schema({
    name:String,
    email:String,
    description:String
})
module.exports=mongoose.model("Contact",schema);