const express = require("express");
const router = express.Router();
const getUser = require("../middleware/fetchUser");
const { signUpRules, signInRules } = require("../utils/routerUtils");
const { signUp, signIn } = require("../controllers/auth.js");
require("dotenv").config();

router.post("/signup", signUpRules, signUp);

router.post("/signin", signInRules, signIn);

module.exports = router;
