const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { handleErrors, generateOTP } = require("../utils/routerUtils.js");
const bcrypt = require("bcrypt");

//Sign Up Function Used To Create New User In SignUp End Point
const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User with this email already exists. Please enter a unique email.",
      });
    }

    const checkingUsername = await User.findOne({
      username: req.body.username,
    });

    if (checkingUsername) {
      return res.status(400).json({
        success: false,
        message: "The User Name Is Already Taken",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    });

    const authToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      authToken,
      message: "Signed Up Successfully",
      success: true,
    });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Server error occurred. Please try again.",
      false
    );
  }
};

//Sign In Function Used In Login End Point
const signIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return handleErrors(res, 400, "Please enter valid credentials.", false);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return handleErrors(res, 400, "Please enter valid credentials.", false);
    }

    const data = {
      user: {
        id: user._id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    const { name } = user;

    res.json({
      success: true,
      authToken,
      name,
    });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Server error occurred. Please try again.",
      false
    );
  }
};

module.exports = {
  signUp,
  signIn,
};
