const express = require("express");
const mongoose = require("mongoose");
const questionsRouter = require("./routers/questions");
const quizRouter = require("./routers/quiz");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mainRouter = require("./routers/main");
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(questionsRouter);
app.use(quizRouter);
app.use(mainRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect("mongodb+srv://grut2077:I562530y2009@node-course-shop.8ylfs.mongodb.net/QuizApp").then((res) => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
