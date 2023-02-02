const express = require("express");
// const User = require("../models/user");
const userController=require('../controllers/user.controller');
// const { get } = require("mongoose");
const router = express.Router();
/**
 * @swagger
 * /users: 
 *   get:
 *     summary: For getting all users
 *     tags: [users]
 * 
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: All users returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
//Get All user stored in database
router.get('/',userController.getAllUser);
/**
 * @swagger
 * /users/{id}: 
 *   get: 
 *     summary: For getting one user
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: The user id
 *     description: Returns a user
 *     responses:
 *       200:
 *         description: user successfully found
 *         content:
 *           application/json:
 *             schema:
 *               type: '#/components/schemas/User'
 *       404:
 *         description: user not found
 */
//View individual Post
router.get("/:id", userController.getOneUser);
/**
 * @swagger
 * /users/{id}: 
 *   patch:
 *     description: For updating a user
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the user 
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: The updated user information
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *               format: password
 *     responses:
 *       201:
 *         description: user has been successfully updated
 *       400:
 *         decription: Invalid user information
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Error message returned from Joi
 *       404:
 *         decription: user has not been found
 */
//update user 
router.patch('/:id',userController.updateUser);
/**
 * @swagger
 * /users/{id}: 
 *   delete: 
 *     summary: For deleting a user
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: The user id
 *     description: Returns deleted user
 *     responses:
 *       200:
 *         description: user successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: '#/components/schemas/User'
 *       404:
 *         description: user not found
 */
//deleter User
router.delete('/:id',userController.deleteUser);

module.exports=router;