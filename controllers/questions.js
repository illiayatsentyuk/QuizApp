const Question = require("../models/question");

const { validationResult } = require("express-validator");

exports.getQuestions = async (req, res, next) => {
  const questions = await Question.find();
  return res.json({
    message: "questions",
    questions: questions,
  });
};

exports.addQuestion = async (req, res, next) => {
  const text = req.body.title;
  const answ = req.body.answ;
  const correct = req.body.correct;

  console.log(answ);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ message: "validation failed", errors: errors });
  }

  if (!correct) {
    return res.json({ message: "Enter correct answer" });
  }

  const question = new Question({
    text: text,
    answ: answ,
    correct: correct,
  });

  const savedQuestion = await question.save();

  return res.json({ question: savedQuestion });
};
