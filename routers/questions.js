const express = require("express");
const questionsController = require("../controllers/questions");
const { body } = require("express-validator");

const router = express.Router();

router.get("/questions", questionsController.getQuestions);

router.post(
  "/questions",
  [body("title").trim().isLength({ min: 5 }), body("answ").isArray({ min: 2 })],
  questionsController.addQuestion
);

module.exports = router;
