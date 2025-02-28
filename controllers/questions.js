const Question = require("../models/question");

const { validationResult } = require("express-validator");

exports.getQuestions = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  // const perPage = 2;
  try {
    const numberOfQuestions = await Question.find().countDocuments();
    const questions = await Question.find();
    // .skip((currentPage - 1) * perPage)
    // .limit(perPage);
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

exports.renderAllQuestions = async (req, res, next) => {
  return res.render("questions");
};
