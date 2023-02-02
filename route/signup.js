const express=require('express');
const router= express.Router();
const {createUser}=require('../controllers/user.controller');
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Cresates a new user.
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User has been created successfully
 *       403:
 *         description: User already exists
 *       424:
 *         description: User has not been created successfully
 * 
 */

router.post('/',createUser);

module.exports=router;