const express = require("express");
const mongoose = require("mongoose");
const questionsRouter = require("./routers/questions");
const quizRouter = require("./routers/quiz");
const bodyParser = require("body-parser");
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(questionsRouter);
app.use(quizRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect("mongodb://127.0.0.1:27017/QuizApp").then((res) => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
