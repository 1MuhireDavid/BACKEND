const express = require("express");
const messageController=require('../controllers/contact-message');
const router = express.Router();

/**
 * @swagger
 * /contactUs:
 *   post:
 *     summary: Creates a new message.
 *     tags: [Contact Us messages]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: message has been created successfully
 *       403:
 *         description: message already exists
 *       424:
 *         description: message has not been created successfully
 * 
 */
router.post('/',messageController.createMessage);
/**
 * @swagger
 * /contactUs: 
 *   get:
 *     summary: For getting all message
 *     tags: [Contact Us messages]
 * 
 *     description: Returns all message
 *     responses:
 *       200:
 *         description: All message returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
//Get All message stored in database
router.get('/',messageController.getAllMessage);
/**
 * @swagger
 * /contactUs/{id}: 
 *   get: 
 *     summary: For getting onemessage
 *     tags: [Contact Us messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: Themessage id
 *     description: Returns amessage
 *     responses:
 *       200:
 *         description: message successfully found
 *         content:
 *           application/json:
 *             schema:
 *               type: '#/components/schemas/User'
 *       404:
 *         description:message not found
 */
//View individual message
router.get("/:id", messageController.getOneMessage);
/**
 * @swagger
 * /contactUs/{id}: 
 *   delete: 
 *     summary: For deleting a message
 *     tags: [Contact Us messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: The message id
 *     description: Returns deleted message
 *     responses:
 *       200:
 *         description: message successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: '#/components/schemas/Contact'
 *       404:
 *         description: Message not found
 */

//deleter Message
router.delete('/:id',messageController.deleteMessage);

module.exports=router;