const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

const db = require("../models");

mongoose.Promise = Promise;
mongoose.connect(
  "mongodb://tlm04070:Tarheels@ds119250.mlab.com:19250/mongoscraper"
);

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
    return res.render("index", hbsObject);
  });
});

app.get("/empty", function(req, res) {
  db.Article.remove({}).then(function() {
    return res.redirect("/");
  });
});

app.put("/save/:id", function(req, res) {
  db.Article.updateOne(
    {
      _id: req.params.id
    },
    {
      saved: true
    },
    {
      new: true
    }
  ).then(function(data) {
    return res.json(data);
  });
});

app.get("/savedList", function(req, res) {
  db.Article.find({
    saved: true
  }).then(function(data) {
    const hbsObject = {
      article: data
    };
    return res.render("index", hbsObject);
  });
});
// app.get("/new", function(req, res){
//   db.Article.updateOne({})
// })

app.post("/articles/:id", async function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { note: dbNote.body } },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      return res.json(dbArticle);
    });
});
module.exports = app;
