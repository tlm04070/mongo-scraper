$(document).ready(function() {
  $(".note-btn").click(function() {
    $(this)
      .closest("div")
      .find(".modal")
      .modal("toggle");

    //$(this).modal("toggle");
  });

  $(".submit").on("click", function(event) {
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    var message = $(this)
      .closest("div")
      .parent()
      .find("textarea")
      .val();

    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        body: message
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

  $(".save").on("click", function() {
    console.log("clicked");
    let thisId = $(this).attr("data-articleid");
    console.log(thisId);
    $.ajax({
      method: "PUT",
      url: "/save/" + thisId,
      data: {
        saved: true
      }
    }).done(function(data) {
      console.log(data);
    });
  });
});
