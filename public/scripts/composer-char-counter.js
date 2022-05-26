
$(document).ready(function() {
  $(".new-tweet").hide();
  $(".scroll-comp").hide();

  $("textarea").on("input", onChange);

  // When user clicks on compose button, toggle new-tweet form. Textarea auto enabled.
  $(".compose").on("click", function(event) {
    $(".new-tweet").toggle();
    $("#tweet-text").focus();
  });

  // When user scrolls up or down show/hide compose button & bottom toggle button
  let startValScrollY = 0;
  $(window).scroll(function(event) {
    let scrollTopPosition = $(this).scrollTop();

    if (scrollTopPosition > startValScrollY) {
      // When user scrolls down, execute:
      $(".scroll-comp").show();
      $(".right-nav-elem").hide();

      // When user scrolls up, execute:
    } else {
      $(".scroll-comp").hide();
      $(".right-nav-elem").show();
    }
    startValScrollY = scrollTopPosition;
  });

  // When user clicks on bottom toggle button
  $(".scroll-comp").on("click", function(event) {
    $(".new-tweet").show();
    $("#tweet-text").focus();
  });

});

// Function to update character counter
const onChange = function() {
  const maxLength = 140;

  const form = $(this).closest("form");
  const counter = form.find(".counter");
  
  let inputLength = $("textarea").val().length;

  const remainingLength = maxLength - inputLength;
  counter.text(remainingLength);

  if (remainingLength < 0) {
    counter.addClass("red");
    return;
  }

  counter.removeClass("red");
};
