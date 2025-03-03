const Quiz = require("../models/quiz");
const Question = require("../models/question");

const { validationResult } = require("express-validator");

exports.postQuiz = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  const name = req.body.name;
  const category = req.body.category;
  const form = req.body.form;
  const questions = req.body.questions;
  const author = "Illia";

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.data = errors;
      throw error;
    }

    const idOfQuestions = await Promise.all(
      questions.map(async (el) => {
        const text = el.text;
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

exports.getQuiz = async (req, res, next) => {
  const { name, category, form } = req.query;
  const currentPage = req.query.page || 1;
  const perPage = 10;

  try {
    let filterQuery = {};
    if (name) filterQuery.name = name;
    if (category) filterQuery.category = category;
    if (form) filterQuery.form = form;
    console.log(filterQuery, 123)
    const totalItems = await Quiz.find({name: { '$regex': `${name}`, '$options': 'i' }}).countDocuments();
    const quizzes = await Quiz.find({name: { '$regex': `${name}`, '$options': 'i' }})
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .populate("questions");

    if (!quizzes.length) {
      const error = new Error("No quizzes found matching the criteria");
      error.statusCode = 404;
      throw error;
    }

    return res.json({
      message: "Filtered quizzes",
      quizzes: quizzes,
      totalItems: totalItems,
      currentPage: currentPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAQuizzes = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  try {
    const totalItems = await Quiz.find().countDocuments();
    const quizzes = await Quiz.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
      
    return res.json({
      message: "Quizzes",
      quizzes: quizzes,
      totalItems: totalItems,
      currentPage: currentPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getQuizById = async (req, res, next) => {
  try {
    const { id } = req.query;
    const quiz = await Quiz.findById(id).populate("questions");
    return res.render("getQuizById", { quiz });
  } catch (err) {
    next(err);
  }
};

exports.renderQuizCategories = async (req, res, next) => {
  return res.render("find-quiz");
};
exports.renderAllQuizzes = async (req, res, next) => {
  return res.render("quizzes");
};
exports.renderAllQuestions = async (req, res, next) => {
  return res.render("questions");
};
exports.renderCreateQuiz = async (req, res, next) => {
  return res.render("create-quiz");
};
