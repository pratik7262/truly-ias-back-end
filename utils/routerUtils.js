const { body, validationResult } = require("express-validator");

const signUpRules = [
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a password of minimum 8 characters").isLength({
    min: 8,
  }),
];

const signInRules = [
  body("email", "Enter A Valid Email").isEmail(),
  body("password", "Enter A Password").exists(),
];

const handleErrors = (res, statusCode, message, success = false) => {
  return res.status(statusCode).json({ message, success });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
};

module.exports = {
  signUpRules,
  handleErrors,
  signInRules,
  generateOTP,
};
