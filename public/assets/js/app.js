$(document).ready(function() {
  $(".note-btn").click(function() {
    $("#note").modal("toggle");
  });

  $("#submit").on("click", function(event) {
    let thisId = $(this).attr("data-id");
    console.log(thisId);
    console.log($("#bodyinput").val());
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        body: $("#bodyinput").val()
      }
    }).done(function(data) {
      console.log(data);
    });
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
