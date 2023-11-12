const express = require("express");
const {
  addQuestion,
  getQuestions,
  getQuestion,
} = require("../controllers/question");
const router = express.Router();
const upload = require("../middleware/upload");

router.post("/addquestion", addQuestion);
router.get("/getquestions", getQuestions);
router.get("/getquestion/:id", getQuestion);

module.exports = router;
