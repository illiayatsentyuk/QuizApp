const express = require("express");
const questionsController = require("../controllers/questions");
const { body } = require("express-validator");

const router = express.Router();

router.get("/questions", questionsController.getQuestions);

router.get("/all-questions", questionsController.renderAllQuestions);

module.exports = router;
