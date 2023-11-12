const Question = require("../models/Question");

const addQuestion = async (req, res) => {
  try {
    const { title, questionText, answer, subject, topic, image } = req.body;

    const newQuestion = new Question({
      title,
      questionText,
      answer,
      image,
      subject,
      topic,
    });

    // Save the question to the database
    await newQuestion.save();

    res
      .status(201)
      .json({ success: true, message: "Question added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  getQuestion,
};
