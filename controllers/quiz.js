const Quiz = require("../models/quiz");
const Question = require("../models/question");

const { validationResult } = require("express-validator");

exports.postQuiz = async (req, res, next) => {
  const errors = validationResult(req);

  const name = req.body.name;
  const category = req.body.category;
  const form = req.body.form;
  const questions = req.body.questions;
  const author = req.body.author;

  let idOfQuestions = [];

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.data = errors;
      throw error;
    }

    const idOfQuestions = await Promise.all(
      questions.map(async (el) => {
        const text = el.title;
        const answ = el.answ;
        const correct = el.correct;

        const question = new Question({
          nameOfTest: name,
          text: text,
          answ: answ,
          correct: correct,
        });

        const savedQuestion = await question.save();
        return savedQuestion._id.toString();
      })
    );
    console.log(idOfQuestions);
    const quiz = new Quiz({
      name: name,
      category: category,
      form: form,
      questions: idOfQuestions,
      author: author,
    });

    const savedQuiz = await quiz.save();

    return res.json({ message: "Quiz created", quiz: savedQuiz });
  } catch (err) {
    next(err);
  }
};
