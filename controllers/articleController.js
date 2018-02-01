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

app.get("/scrape", function(req, res) {
  db.Article.remove({}).then(function(data) {
    axios.get("https://www.reddit.com/r/news").then(function(response) {
      let results = {};
      var $ = cheerio.load(response.data);
      $("p.title").each(function(i, element) {
        results.headline = $(element).text();
        results.summary = $(element).text();
        results.URL = $(element)
          .children("a")
          .attr("href");
        db.Article.create(results);
      });
    });
  });
});

app.get("/", function(req, res) {
  db.Article.find({}).then(function(data) {
    const hbsObject = {
      article: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

app.get("/empty", function(req, res) {
  db.Article.remove({}).then(function() {
    res.redirect("/");
  });
});

app.put("/save/:id", function(req, res) {
  db.Article.updateOne({ _id: req.params.id }).then(function(data) {
    console.log(data);
  });
});

app.get("/savedList", function(req, res) {
  db.Article.find({ saved: true }).then(function(data) {
    const hbsObject = {
      article: data
    };
    res.render("index", hbsObject);
  });
});
// app.get("/new", function(req, res){
//   db.Article.updateOne({})
// })
module.exports = app;
