const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
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
