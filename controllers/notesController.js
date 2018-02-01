const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

const db = require("../models");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoScraper");

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body).then(function(dbNote) {
    res.json(dbNote);
    //   return db.Article.findOneAndUpdate(
    //     { _id: req.params.id },
    //     { note: dbNote._id },
    //     { new: true }
    //   );
  });
  // .then(function(dbArticle) {
  //   res.json(dbArticle);
  // });
});

modules.exports = app;
