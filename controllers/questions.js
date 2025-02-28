const Question = require("../models/question");

const { validationResult } = require("express-validator");

exports.getQuestions = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const numberOfQuestions = await Question.find().countDocuments();
    const questions = await Question.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    return res.json({
      message: "Questions",
      questions: questions,
      numberOfQuestions: numberOfQuestions,
      currentPage: currentPage,
    });
  } catch (err) {
    next(err);
    return err;
  }
};

exports.addQuestion = async (req, res, next) => {
  const text = req.body.title;
  const answ = req.body.answ;
  const correct = req.body.correct;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.data = errors;
      throw error;
    }

    if (!correct) {
      const error = new Error("Enter correct answer");
      error.statusCode = 400;
      throw error;
    }

    const question = new Question({
      text: text,
      answ: answ,
      correct: correct,
    });

    const savedQuestion = await question.save();

    return res.json({ question: savedQuestion });
  } catch (err) {
    next(err);
    return err;
  }
};
