$(document).ready(function() {
  $(".note-btn").click(function() {
    $("#note").modal("toggle");
  });

  $("#submit").on("click", function(event) {
    $("#added").modal("toggle");
  });

  $("#scrapebtn").on("click", function(event) {
    // event.preventDefault();
    console.log("clicked amelies");
    // $.ajax({
    //   method: "GET",
    //   url: "/scrape"
    // }).then(function(response) {
    //   console.log(response);
    // });
    window.location.replace("/scrape");
    console.log("scraping");
    setTimeout(function() {
      window.location.replace("/");
    }, 1000);
  });

  $("#homebtn").on("click", function(event) {
    window.location.replace("/empty");
  });
});
