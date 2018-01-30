$(document).ready(function() {
  $(".note-btn").click(function() {
    $("#note").modal("toggle");
  });

  $("#submit").on("click", function(event) {
    $("#added").modal("toggle");
  });
});
