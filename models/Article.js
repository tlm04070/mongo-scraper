const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  URL: {
    type: String,
    required: true
  },

  note: {
    type: String,
    ref: "Note"
  },
  saved: {
    type: Boolean,
    required: false
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
