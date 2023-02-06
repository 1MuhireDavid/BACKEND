const Message = require("../module/contact-message");
const { validateMessage } = require("../middlewares/signupvalidator");
const { default: mongoose } = require("mongoose");
//Create message
const createMessage = async (req, res) => {
  const { error, value } = validateMessage(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details);
  }
  const message = new Message({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description
  });
  try {
    await message.save();
    res.status(201).json({data: message})
  } catch (error) {
    res.status(500).json({error: "failed to create a message"})
  }

}
//Retrieve All messages
const getAllMessage = async (req, res) => {
  try {
    const message = await Message.find({});
    res.status(200).json({data: message});
  } catch (error) {
    res.status(404).json({error:"Failed to retreive all messages!"});
  }

};
//Retreive only one message
const getOneMessage = async (req, res) => {
  

  try {
    const message = await Message.findOne({
      _id: req.params.id,
    });
    res.status(200).json({data: message});
  } catch (error) {
    
    return res.status(404).json({error: "No message with such ID was found"});
  }
  
};
const deleteMessage = async (req, res) => {
  const message = await Message.findByIdAndRemove(req.params.id);
  if (!message)
    return res.status(404).send("The Message with the given ID was not found");
  res.status(200).json({ message: `Message with id ${req.params.id} deleted Successfully` });
};
module.exports = {
  getAllMessage,
  getOneMessage,
  createMessage,
  deleteMessage,
};