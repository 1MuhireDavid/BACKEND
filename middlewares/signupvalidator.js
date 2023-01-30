const Joi = require("joi");
const bcrypt = require("bcrypt");

const validateUser = user=> {
  const schema = Joi.object( {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(10).alphanum().required(),
  });
  return schema.validate(user);
};
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
module.exports = {
  validateUser,
  hashPassword,
};