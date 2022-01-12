$(document).ready(function () {
  const $textarea = $("#tweet-textarea");
  const $counter = $(".counter");
  const tweetLength = 140;

  $textarea.on("input", function () {
    $counter.text(tweetLength - $textarea.val().length);
    if ($counter.text() < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "black");
    }
  });
});
