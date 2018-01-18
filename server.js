const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const cheerio = require("cheerio");

const app = express();

const databaseUrl = "mongoScraper";
const collections = ["scrapedData"];

const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  res.send("testing api");
});

app.listen(3000, function() {
  console.log("App listening on port 3000");
});
