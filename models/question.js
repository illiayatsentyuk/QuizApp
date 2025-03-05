const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  nameOfTest: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  answ: [
    {
      type: String,
      minLength: 1,
      required: true,
    },
  ],
  correct: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Question", questionSchema);