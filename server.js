const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3005;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// var orm = require("./config/orm.js");
var routes = require("./controllers/articleController.js");
// Console log all the party_name's.

app.use("/", routes);

app.listen(PORT, function() {
  console.log("App listening on port 3005");
});

// db.Article.create(
//   {
//     headline: "testing headline",
//     summary: "testing summary",
//     URL: "testing URL"
//   },
//   function(err, article) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("worked, added article: ");
//       console.log(article);
//     }
//   }
// );

// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with request
//   axios.get("https://www.reddit.com/r/news/").then(function(response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     console.log(response.data);

//     // Now, we grab every h2 within an article tag, and do the following:
//     $("p.title").each(function(i, element) {
//       // Save an empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.headline = $(this).children("a");
//       result.summary = $(this).children("a");
//       result.URL = $(this).children("a");
//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//         .then(function(dbArticle) {
//           // If we were able to successfully scrape and save an Article, send a message to the client
//           res.send("Scrape Complete");
//         })
//         .catch(function(err) {
//           // If an error occurred, send it to the client
//           res.json(err);
//         });
//     });
//   });
// });
