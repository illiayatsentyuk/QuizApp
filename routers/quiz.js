const express = require("express");
const quizController = require("../controllers/quiz");
const { body } = require("express-validator");
const Quiz = require("../models/quiz");

const router = express.Router();

// router.get("/questions", questionsController.getQuestions);

router.post(
  "/quiz",
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .custom((value, { req }) => {
        return Quiz.findOne({ name: value }).then((quizDoc) => {
          if (quizDoc) {
            return Promise.reject("Quiz already exists!");
          }
        });
      }),
    body("category").isAlphanumeric().trim(),
    body("form").isNumeric({ min: 1 }),
    body("questions", "Enter valid questions")
      .isArray({ min: 2 })
      .custom((value, { req }) => {
        let a = 0;
        if (value.length < 2) {
          return false;
        }
        value.forEach((element) => {
          if (!element.text.trim().length > 0 || !element.text) {
            console.log(element);
            a += 1;
            return;
          }
          if (element.answ.length <= 1 || !element.answ) {
            console.log(element);
            a += 1;
            return;
          }
          if (!element.correct || element.correct.trim().length <= 0) {
            console.log(element);
            a += 1;
            return;
          }
        });
        if (a != 0) {
          return false;
        } else {
          return true;
        }
      }),
    // body("author").trim(),
  ],
  quizController.postQuiz
);
router.get("/getQuizById", quizController.getQuizById);

<<<<<<< HEAD
router.get("/getquizzes", quizController.getQuizzes);

router.get("/allquizzes", quizController.getAllQuizzes);
=======
router.get("/quizzes", quizController.getQuiz);

router.get("/Allquizzes", quizController.getAQuizzes);
>>>>>>> 3c66e45373b438a869d1c7fc559108cd2793c91d

router.get("/find-quiz", quizController.renderQuizCategories);

router.get("/all-quizzes", quizController.renderAllQuizzes);


router.get("/create-quiz", quizController.renderCreateQuiz);

module.exports = router;
