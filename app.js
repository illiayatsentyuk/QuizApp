const express = require("express");
const mongoose = require("mongoose");
const questionsRouter = require("./routers/questions");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(questionsRouter);

mongoose.connect("mongodb://127.0.0.1:27017/QuizApp").then((res) => {
  console.log(1);
  app.listen(3000, () => {
    console.log(123);
  });
});
