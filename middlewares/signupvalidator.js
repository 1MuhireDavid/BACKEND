const Joi = require("joi");
const bcrypt = require("bcrypt");

const validateUser = user=> {
  const schema = Joi.object( {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(10).alphanum().required(),
    role: Joi.string(),
  });
  return schema.validate(user);
};
const validateMessage = message=> {
  const schema = Joi.object( {
    name: Joi.string().required(), 
    email: Joi.string().email().required(),
    description: Joi.string().required(),
  });
  return schema.validate(message);
};
const hashPassword = async (password) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};
module.exports = {
  validateUser,
  validateMessage,
  hashPassword,
};